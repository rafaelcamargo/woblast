import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { TipBox } from '@src/base/components/tip-box/tip-box';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';
import translations from './plan-retirement-wizard-step-4.t';

const FORM_ID = 'planRetirementWizardStep4Form';

type PlanRetirementWizardStep4Props = {
  formData: RetirementPlanDraft;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  onSubmit: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep4 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  onSubmit,
  hasPreviousStep
}: PlanRetirementWizardStep4Props) => {
  const { t } = useTranslation(translations);
  const isFormInvalid = !(Number(formData.averageAnnualInflation) > 0);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !isFormInvalid && onSubmit();
  };

  return (
    <WizardStep
      stepName={t('expected_inflation')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={isFormInvalid}
      nextButtonFormId={FORM_ID}
      onPreviousButtonClick={onPreviousButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-4'>
        <form id={FORM_ID} onSubmit={handleSubmit}>
          <p>{t('expected_inflation_description')}</p>
          <NumberInput
            name='averageAnnualInflation'
            value={formData.averageAnnualInflation}
            type='percent'
            autoFocus
            aria-label={t('average_annual_inflation') as string}
            onValueChange={onValueChange}
          />
          <TipBox
            title={t('tip_title') as string}
            description={
              <>
                <p>{t('tip_description_1')}</p>
                <p>{t('tip_description_2')}</p>
              </>
            }
          />
        </form>
      </div>
    </WizardStep>
  );
};
