import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';
import translations from './plan-retirement-wizard-step-6.t';

type PlanRetirementWizardStep6Props = {
  formData: PlanRetirementWizardFormData;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep6 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  hasPreviousStep
}: PlanRetirementWizardStep6Props) => {
  const { t } = useTranslation(translations);

  return (
    <WizardStep
      stepName={t('desired_monthly_income')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={!(Number(formData.desiredMonthlyIncome) > 0)}
      onPreviousButtonClick={onPreviousButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-6'>
        <p>{t('desired_monthly_income_description')}</p>
        <NumberInput
          name='desiredMonthlyIncome'
          value={formData.desiredMonthlyIncome}
          type='currency'
          aria-label={t('desired_monthly_income_amount') as string}
          onValueChange={onValueChange}
        />
      </div>
    </WizardStep>
  );
};
