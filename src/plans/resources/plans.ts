import type { PlanParams } from '@src/plans/types/plan-params';
import type { PlanParamsPayload } from '@src/plans/types/plan-params-payload';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import dateService from '@src/base/services/date';
import idService from '@src/base/services/id';
import localStorageService from '@src/base/services/local-storage';

type PlansResource = {
  getTemporaryParams: () => RetirementPlanFormData | undefined
  find: (id: string) => PlanParams | undefined
  get: () => PlanParams[]
  save: (plan: PlanParamsPayload) => void
  clearTemporaryRetirementPlanParams: () => void
};

const _public = {} as PlansResource;

_public.getTemporaryParams = () => {
  return localStorageService.get('wt_retirementPlanFormData');
};

_public.find = id => {
  const plans = _public.get();
  return plans.find(plan => plan.id === id);
};

_public.get = () => {
  return localStorageService.get('wt_plans') || [];
};

_public.save = plan => {
  const plans = _public.get();
  localStorageService.set('wt_plans', [...plans, {
    ...plan,
    id: idService.generateId(),
    created_at: dateService.getNow().toISOString()
  }]);
};

_public.clearTemporaryRetirementPlanParams = () => {
  window.localStorage.removeItem('wt_retirementPlanFormData');
};

export default _public;
