import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { TipBox } from '@src/base/components/tip-box/tip-box';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';
import translations from './plan-retirement-wizard-step-5.t';

const FORM_ID = 'planRetirementWizardStep5Form';

type PlanRetirementWizardStep5Props = {
  formData: RetirementPlanDraft;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onPreviousButtonClick: () => void;
  onSubmit: () => void;
  hasPreviousStep?: boolean;
}

export const PlanRetirementWizardStep5 = ({
  formData,
  onValueChange,
  onPreviousButtonClick,
  onSubmit,
  hasPreviousStep
}: PlanRetirementWizardStep5Props) => {
  const { t } = useTranslation(translations);
  const isFormInvalid = !(Number(formData.averageTaxRate) > 0);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !isFormInvalid && onSubmit();
  };

  return (
    <WizardStep
      stepName={t('taxes')}
      hasPreviousStep={hasPreviousStep}
      nextButtonDisabled={isFormInvalid}
      nextButtonFormId={FORM_ID}
      onPreviousButtonClick={onPreviousButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-5'>
        <form id={FORM_ID} onSubmit={handleSubmit}>
          <p>{t('taxes_description')}</p>
          <NumberInput
            name='averageTaxRate'
            value={formData.averageTaxRate}
            type='percent'
            autoFocus
            aria-label={t('average_tax_rate') as string}
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
