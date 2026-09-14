import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';
import translations from './plan-retirement-wizard-step-6.t';

const FORM_ID = 'planRetirementWizardStep6Form';

type PlanRetirementWizardStep6Props = {
  formData: RetirementPlanDraft;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  onSubmit: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep6 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  onSubmit,
  hasPreviousStep
}: PlanRetirementWizardStep6Props) => {
  const { t } = useTranslation(translations);
  const isFormInvalid = !(Number(formData.desiredMonthlyIncome) > 0);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !isFormInvalid && onSubmit();
  };

  return (
    <WizardStep
      stepName={t('desired_monthly_income')}
      nextButtonLabel={t('done')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={isFormInvalid}
      nextButtonFormId={FORM_ID}
      onPreviousButtonClick={onPreviousButtonClick}
    >
      <form id={FORM_ID} onSubmit={handleSubmit}>
        <div className='wt-plan-retirement-wizard-step-6'>
          <p>{t('desired_monthly_income_description')}</p>
          <NumberInput
            name='desiredMonthlyIncome'
            value={formData.desiredMonthlyIncome}
            type='currency'
            autoFocus
            aria-label={t('desired_monthly_income_amount') as string}
            onValueChange={onValueChange}
          />
        </div>
      </form>
    </WizardStep>
  );
};
