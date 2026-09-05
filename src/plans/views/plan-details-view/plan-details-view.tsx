import { useTranslation } from '@compilorama/polang';
import { useParams } from 'react-router-dom';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import { useFormatter } from '@src/base/hooks/use-formatter';
import plansResource from '@src/plans/resources/plans';
import retirementService from '@src/plans/services/retirement';
import { Button } from '@src/base/components/button/button';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import RetirementPlanList from '@src/plans/components/retirement-plan-list/retirement-plan-list';
import translations from './plan-details-view.t';

const PlanDetailsView = () => {
  const { planId } = useParams();
  const { t } = useTranslation(translations);
  const { formatCurrency, formatMonthYear } = useFormatter();
  const plan = buildPlan(planId);

  const handleSave = () => {
    const formData = plansResource.find(planId);
    formData && plansResource.save(buildRetirementParams(formData));
  };

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
            <footer className='wt-plan-details-view-footer'>
              <Button onClick={handleSave}>
                {t('save')}
              </Button>
            </footer>
          </>
        )}
      </ViewContainer>
    </div>
  );
};

function buildPlan(planId?: string) {
  const formData = plansResource.find(planId);
  return formData ? retirementService.buildPlan(formData) : null;
}

function buildRetirementParams(data: RetirementPlanFormData): RetirementPlanParams {
  return {
    initialBalance: data.initialBalance,
    monthlyDeposit: data.monthlyDeposit,
    averageAnnualReturn: data.averageAnnualReturn,
    averageAnnualInflation: data.averageAnnualInflation,
    averageTaxRate: data.averageTaxRate,
    desiredMonthlyIncome: data.desiredMonthlyIncome
  } as RetirementPlanParams;
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
