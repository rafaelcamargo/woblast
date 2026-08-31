import { useTranslation } from '@compilorama/polang';
import { NumberInput, type NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { Radio } from '@src/base/components/radio/radio';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import translations from './plan-retirement-wizard-step-1.t';

const BALANCE_UNAVAILABLE = 'balance_unavailable';
const BALANCE_AVAILABLE = 'balance_available';

type PlanRetirementWizardStep1Props = {
  formData: RetirementPlanFormData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (nextValue: NumberInputChangeValue) => void;
  onNextButtonClick: () => void;
}

export const PlanRetirementWizardStep1 = ({
  formData,
  onChange,
  onValueChange,
  onNextButtonClick
}: PlanRetirementWizardStep1Props) => {
  const { t } = useTranslation(translations);

  return (
    <WizardStep
      stepName={t('step_name')}
      nextButtonDisabled={isNextButtonDisabled(formData)}
      onNextButtonClick={onNextButtonClick}
    >
      <div className='wt-plan-retirement-wizard-step-1'>
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
      </div>
    </WizardStep>
  );
};

function isNextButtonDisabled(formData: RetirementPlanFormData) {
  return formData.initialBalanceAvailability === BALANCE_AVAILABLE && !(Number(formData.initialBalance) > 0);
}

function buildBalanceInput(
  optionValue: string,
  formData: RetirementPlanFormData,
  onValueChange: (nextValue: NumberInputChangeValue) => void,
  t: (key: string) => React.ReactNode
) {
  if (optionValue !== BALANCE_AVAILABLE || formData.initialBalanceAvailability !== BALANCE_AVAILABLE) return null;
  return (
    <NumberInput
      name='initialBalance'
      value={formData.initialBalance}
      type='currency'
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
