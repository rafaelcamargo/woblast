import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';

export type PlanParamsPayload = {
  name: string
  type: 'retirement'
} & RetirementPlanParams;
