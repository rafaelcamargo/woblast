import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import translations from './plan-retirement-wizard-step-2.t';

type PlanRetirementWizardStep2Props = {
  formData: RetirementPlanFormData;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep2 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  onNextButtonClick,
  hasPreviousStep
}: PlanRetirementWizardStep2Props) => {
  const { t } = useTranslation(translations);

  return (
    <WizardStep
      stepName={t('monthly_deposits')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={!(Number(formData.monthlyDeposit) > 0)}
      onPreviousButtonClick={onPreviousButtonClick}
      onNextButtonClick={onNextButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-2'>
        <p>{t('monthly_deposits_description')}</p>
        <NumberInput
          name='monthlyDeposit'
          value={formData.monthlyDeposit}
          type='currency'
          aria-label={t('monthly_deposit_amount') as string}
          onValueChange={onValueChange}
        />
      </div>
    </WizardStep>
  );
};
