import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import translations from './plan-retirement-wizard-step-4.t';

type PlanRetirementWizardStep4Props = {
  formData: RetirementPlanFormData;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep4 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  onNextButtonClick,
  hasPreviousStep
}: PlanRetirementWizardStep4Props) => {
  const { t } = useTranslation(translations);

  return (
    <WizardStep
      stepName={t('expected_inflation')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={!(Number(formData.averageAnnualInflation) > 0)}
      onPreviousButtonClick={onPreviousButtonClick}
      onNextButtonClick={onNextButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-4'>
        <p>{t('expected_inflation_description')}</p>
        <NumberInput
          name='averageAnnualInflation'
          value={formData.averageAnnualInflation}
          type='percent'
          aria-label={t('average_annual_inflation') as string}
          onValueChange={onValueChange}
        />
      </div>
    </WizardStep>
  );
};
