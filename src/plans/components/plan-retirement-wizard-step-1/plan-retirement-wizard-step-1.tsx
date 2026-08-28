import { useTranslation } from '@compilorama/polang';
import { MoneyInput, type MoneyInputChangeValue } from '@src/base/components/money-input/money-input';
import { Radio } from '@src/base/components/radio/radio';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';
import translations from './plan-retirement-wizard-step-1.t';

const BALANCE_UNAVAILABLE = 'balance_unavailable';
const BALANCE_AVAILABLE = 'balance_available';

type PlanRetirementWizardStep1Props = {
  formData: PlanRetirementWizardFormData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (nextValue: MoneyInputChangeValue) => void;
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
      nextStepEnabled={isNextStepEnabled(formData)}
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
            {buildBalanceInput(option.value, formData, onValueChange)}
          </Radio>
        ))}
      </div>
    </WizardStep>
  );
};

function isNextStepEnabled(formData: PlanRetirementWizardFormData) {
  return formData.initialBalanceAvailability === BALANCE_UNAVAILABLE || Number(formData.initialBalance) > 0;
}

function buildBalanceInput(
  optionValue: string,
  formData: PlanRetirementWizardFormData,
  onValueChange: (nextValue: MoneyInputChangeValue) => void
) {
  if (optionValue !== BALANCE_AVAILABLE || formData.initialBalanceAvailability !== BALANCE_AVAILABLE) return null;
  return (
    <MoneyInput
      name='initialBalance'
      value={formData.initialBalance}
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
