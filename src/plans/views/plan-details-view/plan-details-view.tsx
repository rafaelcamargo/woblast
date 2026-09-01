import { useTranslation } from '@compilorama/polang';
import { useParams } from 'react-router-dom';
import { useFormatter } from '@src/base/hooks/useFormatter';
import localStorageService from '@src/base/services/local-storage';
import retirementService from '@src/plans/services/retirement';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import translations from './plan-details-view.t';

const PlanDetailsView = () => {
  const { planId } = useParams();
  const { t } = useTranslation(translations);
  const { formatCurrency, formatMonthYear } = useFormatter();
  const plan = buildPlan(planId);

  return (
    <div className='wt-plan-details-view'>
      <Topbar midSlot={<Logo />} />
      <ViewContainer>
        <h1>{t('plan_created')}</h1>
        {plan && (
          <p id="retirementResultDescription">
            {t('retirement_result_description', {
              retirementDate: <b>{formatRetirementDate(plan.date, formatMonthYear)}</b>,
              retirementBalance: <b>{formatCurrency(plan.balance)}</b>,
              retirementIncome: <b>{formatCurrency(plan.interests)}</b>
            })}
          </p>
        )}
      </ViewContainer>
    </div>
  );
};

function buildPlan(planId?: string) {
  return planId === 'temp'
    ? retirementService.buildPlan(localStorageService.get('wt_retirementPlanFormData'))
    : null;
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
