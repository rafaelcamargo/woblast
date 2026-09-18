import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import { useParams } from 'react-router-dom';
import { usePlans } from '@src/plans/hooks/use-plans';
import retirementService from '@src/plans/services/retirement';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import { Button } from '@src/base/components/button/button';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import PlanDetailsSummary from '@src/plans/components/plan-details-summary/plan-details-summary';
import PlanDialog from '@src/plans/components/plan-dialog/plan-dialog';
import RetirementPlanList from '@src/plans/components/retirement-plan-list/retirement-plan-list';
import translations from './plan-details-view.t';

// eslint-disable-next-line complexity
const PlanDetailsView = () => {
  const { planId } = useParams();
  const { t } = useTranslation(translations);
  const { find, getRetirementPlanDraft } = usePlans();
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const retirementParams = buildRetirementPlanParams(planId, find, getRetirementPlanDraft);
  const plan = retirementParams ? retirementService.buildPlan(retirementParams) : null;
  const heading = buildTopbarHeading(planId, find, t('new_plan'));

  return (
    <div className='wt-plan-details-view'>
      <Topbar
        backLinkHref={planId ? '/plans' : undefined}
        leftSlot={<h1>{heading}</h1>}
        rightSlot={<Logo wordmark />}
      />
      <ViewContainer>
        {plan && (
          <>
            <PlanDetailsSummary
              retirementDate={plan.date}
              balance={plan.balance}
              interests={plan.interests}
            />
            <RetirementPlanList months={plan.months} />
            {!planId && (
              <footer className='wt-plan-details-view-footer'>
                <Button theme='primary' onClick={() => setPlanDialogOpen(true)}>
                  {t('save')}
                </Button>
              </footer>
            )}
          </>
        )}
      </ViewContainer>
      {!planId && <PlanDialog open={planDialogOpen} onClose={() => setPlanDialogOpen(false)} />}
    </div>
  );
};

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
