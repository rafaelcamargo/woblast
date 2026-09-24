import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import { useParams } from 'react-router-dom';
import useCustomHistoryModule from '@src/base/hooks/use-custom-history';
import { usePlans } from '@src/plans/hooks/use-plans';
import retirementService, { type RetirementPlan } from '@src/plans/services/retirement';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import { Button } from '@src/base/components/button/button';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import PlanDetailsSummary from '@src/plans/components/plan-details-summary/plan-details-summary';
import PlanDialog from '@src/plans/components/plan-dialog/plan-dialog';
import { PlanRetirementError } from '@src/plans/components/plan-retirement-error/plan-retirement-error';
import RetirementPlanList from '@src/plans/components/retirement-plan-list/retirement-plan-list';
import translations from './plan-details-view.t';

// eslint-disable-next-line max-statements, complexity
const PlanDetailsView = () => {
  const { planId } = useParams();
  const { t } = useTranslation(translations);
  const customHistory = useCustomHistoryModule.useCustomHistory();
  const { deleteRetirementPlanDraft, find, getRetirementPlanDraft } = usePlans();
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const retirementParams = buildRetirementPlanParams(planId, find, getRetirementPlanDraft);
  const planResult = retirementParams ? buildPlan(retirementParams) : null;
  const heading = buildTopbarHeading(planId, find, t('new_plan'));
  const discardDraft = () => {
    deleteRetirementPlanDraft();
    customHistory.push('/plans');
  };

  return (
    <div className='wt-plan-details-view'>
      <Topbar
        backLinkHref={planId ? '/plans' : undefined}
        leftSlot={<h1>{heading}</h1>}
        rightSlot={<Logo wordmark />}
      />
      <ViewContainer>
        {planResult?.status === 'success' && (
          <>
            <PlanDetailsSummary
              retirementDate={planResult.plan.date}
              balance={planResult.plan.balance}
              interests={planResult.plan.interests}
            />
            <RetirementPlanList months={planResult.plan.months} />
            {!planId && (
              <footer className='wt-plan-details-view-footer'>
                <Button theme='secondary' onClick={discardDraft}>
                  {t('discard')}
                </Button>
                <Button theme='primary' onClick={() => setPlanDialogOpen(true)}>
                  {t('save')}
                </Button>
              </footer>
            )}
          </>
        )}
        {(planResult?.status === 'unreachable' || planResult?.status === 'unknown_error') && (
          <PlanRetirementError status={planResult.status} />
        )}
      </ViewContainer>
      {!planId && planResult?.status === 'success' && (
        <PlanDialog open={planDialogOpen} onClose={() => setPlanDialogOpen(false)} />
      )}
    </div>
  );
};

type PlanResult =
  | { status: 'success'; plan: RetirementPlan }
  | { status: 'unreachable' }
  | { status: 'unknown_error' };

function buildPlan(params: RetirementPlanParams): PlanResult {
  try {
    return { status: 'success', plan: retirementService.buildPlan(params) };
  } catch (error) {
    if (error instanceof RangeError) {
      return { status: 'unreachable' };
    }
    return { status: 'unknown_error' };
  }
}

function buildRetirementPlanParams(
  planId: string | undefined,
  find: ReturnType<typeof usePlans>['find'],
  getRetirementPlanDraft: ReturnType<typeof usePlans>['getRetirementPlanDraft']
): RetirementPlanParams | undefined {
  const data = planId ? find(planId) : getRetirementPlanDraft();
  return data ? retirementService.convertToRetirementPlanParams(data) : undefined;
}

function buildTopbarHeading(
  planId: string | undefined,
  find: ReturnType<typeof usePlans>['find'],
  newPlanHeading: React.ReactNode
){
  return planId ? find(planId)?.name : newPlanHeading;
}

export default PlanDetailsView;
