import type { PlanParamsPayload } from '@src/plans/types/plan-params-payload';

export type PlanParams = {
  id: string
  created_at: string
} & PlanParamsPayload;
