import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';
import translations from './plan-retirement-wizard-step-3.t';

type PlanRetirementWizardStep3Props = {
  formData: PlanRetirementWizardFormData;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep3 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  hasPreviousStep
}: PlanRetirementWizardStep3Props) => {
  const { t } = useTranslation(translations);

  return (
    <WizardStep
      stepName={t('expected_return')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={!(Number(formData.averageAnnualReturn) > 0)}
      onPreviousButtonClick={onPreviousButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-3'>
        <p>{t('expected_return_description')}</p>
        <NumberInput
          name='averageAnnualReturn'
          value={formData.averageAnnualReturn}
          type='percent'
          aria-label={t('average_annual_return') as string}
          onValueChange={onValueChange}
        />
      </div>
    </WizardStep>
  );
};
