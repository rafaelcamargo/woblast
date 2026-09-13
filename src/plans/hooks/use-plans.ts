import { useLocalStorageState } from '@src/base/hooks/use-local-storage-state';
import dateService from '@src/base/services/date';
import idService from '@src/base/services/id';
import type { PlanParams } from '@src/plans/types/plan-params';
import type { PlanParamsPayload } from '@src/plans/types/plan-params-payload';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';

type UsePlans = {
  deleteRetirementPlanDraft: () => void
  find: (id: string) => PlanParams | undefined
  get: () => PlanParams[]
  getRetirementPlanDraft: () => RetirementPlanDraft | null
  save: (plan: PlanParamsPayload) => void
};

export function usePlans(): UsePlans {
  const [plans, setPlans] = useLocalStorageState<PlanParams[]>('wt_plans', []);
  const [retirementPlanDraft, setRetirementPlanDraft] = useLocalStorageState<
    RetirementPlanDraft | null
  >('wt_retirementPlanDraft', null);

  return {
    get: () => plans,
    find: id => plans.find(plan => plan.id === id),
    getRetirementPlanDraft: () => retirementPlanDraft,
    save: plan => {
      setPlans([...plans, {
        ...plan,
        id: idService.generateId(),
        created_at: dateService.getNow().toISOString()
      }]);
    },
    deleteRetirementPlanDraft: () => {
      setRetirementPlanDraft(null);
    }
  };
}
