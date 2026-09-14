import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';
import translations from './plan-retirement-wizard-step-2.t';

const FORM_ID = 'planRetirementWizardStep2Form';

type PlanRetirementWizardStep2Props = {
  formData: RetirementPlanDraft;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  onSubmit: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep2 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  onSubmit,
  hasPreviousStep
}: PlanRetirementWizardStep2Props) => {
  const { t } = useTranslation(translations);
  const isFormInvalid = !(Number(formData.monthlyDeposit) > 0);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !isFormInvalid && onSubmit();
  };

  return (
    <WizardStep
      stepName={t('monthly_deposits')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={isFormInvalid}
      nextButtonFormId={FORM_ID}
      onPreviousButtonClick={onPreviousButtonClick}
    >
      <form id={FORM_ID} onSubmit={handleSubmit}>
        <div className='wt-plan-retirement-wizard-step-2'>
          <p>{t('monthly_deposits_description')}</p>
          <NumberInput
            name='monthlyDeposit'
            value={formData.monthlyDeposit}
            type='currency'
            autoFocus
            aria-label={t('monthly_deposit_amount') as string}
            onValueChange={onValueChange}
          />
        </div>
      </form>
    </WizardStep>
  );
};
