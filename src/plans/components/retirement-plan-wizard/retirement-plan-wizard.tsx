import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import { Radio } from '@src/base/components/radio/radio';
import { Wizard } from '@src/base/components/wizard/wizard';
import { WizardStep } from '@src/base/components/wizard-step/wizard-step';
import translations from './retirement-plan-wizard.t';

const BALANCE_UNAVAILABLE = 'balance_unavailable';
const BALANCE_AVAILABLE = 'balance_available';

export const RetirementPlanWizard = () => {
  const { t } = useTranslation(translations);
  const [selectedBalanceOption, setSelectedBalanceOption] = useState(BALANCE_UNAVAILABLE);
  const [initialBalance, setInitialBalance] = useState('0');

  return (
    <Wizard currentStep={1}>
      <WizardStep
        stepName={t('step_name')}
        nextStepEnabled={isNextStepEnabled(selectedBalanceOption, initialBalance)}
      >
        <div className='wt-retirement-plan-wizard'>
          {buildBalanceOptions(t).map(option => (
            <Radio
              key={option.value}
              name='initial_balance_source'
              value={option.value}
              checked={selectedBalanceOption === option.value}
              label={option.title}
              description={option.description}
              onChange={({ target }) => setSelectedBalanceOption(target.value)}
            >
              {option.value === BALANCE_AVAILABLE && selectedBalanceOption === BALANCE_AVAILABLE && (
                <input
                  name='initial_balance'
                  value={initialBalance}
                  type='text'
                  className="wt-retirement-plan-wizard-balance-input"
                  onChange={({ target }) => setInitialBalance(target.value)}
                />
              )}
            </Radio>
          ))}
        </div>
      </WizardStep>
    </Wizard>
  );
};

function isNextStepEnabled(selectedBalanceOption: string, initialBalance: string) {
  return selectedBalanceOption === BALANCE_UNAVAILABLE || parseBalance(initialBalance) > 0;
}

function parseBalance(value: string) {
  return Number(value.replace(/\./g, '').replace(',', '.'));
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
