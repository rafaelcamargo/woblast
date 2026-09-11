import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import { useParams } from 'react-router-dom';
import { useFormatter } from '@src/base/hooks/use-formatter';
import plansResource from '@src/plans/resources/plans';
import retirementService from '@src/plans/services/retirement';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import { Button } from '@src/base/components/button/button';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import PlanDialog from '@src/plans/components/plan-dialog/plan-dialog';
import RetirementPlanList from '@src/plans/components/retirement-plan-list/retirement-plan-list';
import translations from './plan-details-view.t';

// eslint-disable-next-line max-statements, complexity
const PlanDetailsView = () => {
  const { planId } = useParams();
  const { t } = useTranslation(translations);
  const { formatCurrency, formatMonthYear } = useFormatter();
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const retirementParams = buildRetirementPlanParams(planId);
  const plan = retirementParams ? retirementService.buildPlan(retirementParams) : null;
  const openPlanDialog = () => setPlanDialogOpen(true);
  const closePlanDialog = () => setPlanDialogOpen(false);

  return (
    <div className='wt-plan-details-view'>
      <Topbar midSlot={<Logo />} />
      <ViewContainer>
        <h1>{t('plan_created')}</h1>
        {plan && (
          <>
            <p id="retirementResultDescription">
              {t('retirement_result_description', {
                retirementDate: <b>{formatRetirementDate(plan.date, formatMonthYear)}</b>,
                retirementBalance: <b>{formatCurrency(plan.balance)}</b>,
                retirementIncome: <b>{formatCurrency(plan.interests)}</b>
              })}
            </p>
            <RetirementPlanList months={plan.months} />
            {!planId && (
              <footer className='wt-plan-details-view-footer'>
                <Button theme='primary' onClick={openPlanDialog}>
                  {t('save')}
                </Button>
              </footer>
            )}
          </>
        )}
      </ViewContainer>
      {!planId && <PlanDialog open={planDialogOpen} onClose={closePlanDialog} />}
    </div>
  );
};

function buildRetirementPlanParams(planId?: string): RetirementPlanParams | undefined {
  const data = planId
    ? plansResource.find(planId)
    : plansResource.getTemporaryParams();
  return data ? retirementService.convertToRetirementPlanParams(data) : undefined;
}

function formatRetirementDate(date: string, formatMonthYear: ReturnType<typeof useFormatter>['formatMonthYear']) {
  const [month, year] = date.split('-');
  return formatMonthYear({
    month,
    monthFormat: 'long',
    year,
    yearFormat: 'numeric'
  });
}

export default PlanDetailsView;
