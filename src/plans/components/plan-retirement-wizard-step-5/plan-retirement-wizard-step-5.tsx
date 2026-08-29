import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';
import translations from './plan-retirement-wizard-step-5.t';

type PlanRetirementWizardStep5Props = {
  formData: PlanRetirementWizardFormData;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep5 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  onNextButtonClick,
  hasPreviousStep
}: PlanRetirementWizardStep5Props) => {
  const { t } = useTranslation(translations);

  return (
    <WizardStep
      stepName={t('taxes')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={!(Number(formData.averageTaxRate) > 0)}
      onPreviousButtonClick={onPreviousButtonClick}
      onNextButtonClick={onNextButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-5'>
        <p>{t('taxes_description')}</p>
        <NumberInput
          name='averageTaxRate'
          value={formData.averageTaxRate}
          type='percent'
          aria-label={t('average_tax_rate') as string}
          onValueChange={onValueChange}
        />
      </div>
    </WizardStep>
  );
};
