import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import dateService from '@src/base/services/date';
import localStorageService from '@src/base/services/local-storage';

type PlansResource = {
  find: (id?: string) => RetirementPlanFormData | undefined
  save: (planParams: RetirementPlanParams) => void
};

const _public = {} as PlansResource;

_public.find = id => {
  const plan = localStorageService.get('wt_retirementPlanFormData');
  return plan?.id === id ? plan : undefined;
};

_public.save = planParams => {
  const plans = localStorageService.get('wt_plans') || [];
  localStorageService.set('wt_plans', [
    ...plans,
    {
      ...planParams,
      created_at: dateService.getNow().toISOString()
    }
  ]);
};

export default _public;
