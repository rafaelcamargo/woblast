import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { Radio } from '@src/base/components/radio/radio';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';
import translations from './plan-retirement-wizard-step-1.t';

const BALANCE_UNAVAILABLE = 'balance_unavailable';
const BALANCE_AVAILABLE = 'balance_available';
const FORM_ID = 'planRetirementWizardStep1Form';

type PlanRetirementWizardStep1Props = {
  formData: RetirementPlanDraft;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onSubmit: () => void;
}

export const PlanRetirementWizardStep1 = ({
  formData,
  onChange,
  onValueChange,
  onSubmit
}: PlanRetirementWizardStep1Props) => {
  const { t } = useTranslation(translations);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !isNextButtonDisabled(formData) && onSubmit();
  };

  return (
    <WizardStep
      stepName={t('step_name')}
      nextButtonDisabled={isNextButtonDisabled(formData)}
      nextButtonFormId={FORM_ID}
    >
      <div className='wt-plan-retirement-wizard-step-1'>
        <form id={FORM_ID} onSubmit={handleSubmit}>
          {buildBalanceOptions(t).map(option => (
            <Radio
              key={option.value}
              name='initialBalanceAvailability'
              value={option.value}
              checked={formData.initialBalanceAvailability === option.value}
              label={option.title}
              description={option.description}
              onChange={onChange}
            >
              {buildBalanceInput(option.value, formData, onValueChange, t)}
            </Radio>
          ))}
        </form>
      </div>
    </WizardStep>
  );
};

function isNextButtonDisabled(formData: RetirementPlanDraft) {
  return formData.initialBalanceAvailability === BALANCE_AVAILABLE && !(Number(formData.initialBalance) > 0);
}

function buildBalanceInput(
  optionValue: string,
  formData: RetirementPlanDraft,
  onValueChange: (nextValue: NumberInputChangeValue) => void,
  t: (key: string) => React.ReactNode
) {
  if (optionValue !== BALANCE_AVAILABLE || formData.initialBalanceAvailability !== BALANCE_AVAILABLE) return null;
  return (
    <NumberInput
      name='initialBalance'
      value={formData.initialBalance}
      type='currency'
      autoFocus
      aria-label={t('initial_balance') as string}
      onValueChange={onValueChange}
    />
  );
}

function buildBalanceOptions(t: (key: string) => React.ReactNode) {
  return [
    {
      value: BALANCE_UNAVAILABLE,
      title: t('balance_unavailable_title'),
      description: t('balance_unavailable_description')
    },
    {
      value: BALANCE_AVAILABLE,
      title: t('balance_available_title'),
      description: t('balance_available_description')
    }
  ];
}
