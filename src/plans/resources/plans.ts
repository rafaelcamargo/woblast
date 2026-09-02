import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import localStorageService from '@src/base/services/local-storage';

type PlansResource = {
  find: (id?: string) => RetirementPlanFormData | undefined
};

const _public = {} as PlansResource;

_public.find = id => {
  const plan = localStorageService.get('wt_retirementPlanFormData');
  return plan?.id === id ? plan : undefined;
};

export default _public;
