import { useTranslation } from '@compilorama/polang';
import { MoneyInput, type MoneyInputChangeValue } from '@src/base/components/money-input/money-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';
import translations from './plan-retirement-wizard-step-2.t';

type PlanRetirementWizardStep2Props = {
  formData: PlanRetirementWizardFormData;
  onValueChange: (nextValue: MoneyInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep2 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  hasPreviousStep
}: PlanRetirementWizardStep2Props) => {
  const { t } = useTranslation(translations);

  return (
    <WizardStep
      stepName={t('monthly_deposits')}
      hasPreviousStep={hasPreviousStep}
      onPreviousButtonClick={onPreviousButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-2'>
        <p>{t('monthly_deposits_description')}</p>
        <MoneyInput
          name='monthlyDeposit'
          value={formData.monthlyDeposit}
          aria-label={t('monthly_deposit_amount') as string}
          onValueChange={onValueChange}
        />
      </div>
    </WizardStep>
  );
};
