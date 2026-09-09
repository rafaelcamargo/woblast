import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import useCustomHistoryModule from '@src/base/hooks/use-custom-history';
import plansResource from '@src/plans/resources/plans';
import { Button } from '@src/base/components/button/button';
import { Dialog } from '@src/base/components/dialog/dialog';
import translations from './plan-dialog.t';

type PlanDialogProps = {
  open?: boolean
  formData?: RetirementPlanFormData
  onClose: () => void
}

const PlanDialog = ({ open, formData, onClose }: PlanDialogProps) => {
  const { t } = useTranslation(translations);
  const customHistory = useCustomHistoryModule.useCustomHistory();
  const [planName, setPlanName] = useState('');
  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(target.value);
  };
  const savePlan = () => {
    plansResource.save({
      ...buildRetirementParams(formData as RetirementPlanFormData),
      name: planName.trim()
    });
    customHistory.push('/plans');
  };

  return (
    <Dialog
      open={open}
      title={t('save_plan')}
      onClose={onClose}
    >
      <div className='wt-plan-dialog'>
        <input
          type='text'
          value={planName}
          aria-label={t('plan_name') as string}
          placeholder={t('plan_name') as string}
          onChange={handleNameChange}
        />
        <div className='wt-plan-dialog-actions'>
          <Button
            theme='primary'
            onClick={savePlan}
            disabled={!planName.trim()}
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

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

export default PlanDialog;
