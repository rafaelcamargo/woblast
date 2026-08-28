import { useState } from 'react';
import type { NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { Wizard } from '@src/base/components/wizard/wizard';
import { PlanRetirementWizardStep1 } from '@src/plans/components/plan-retirement-wizard-step-1/plan-retirement-wizard-step-1';
import { PlanRetirementWizardStep2 } from '@src/plans/components/plan-retirement-wizard-step-2/plan-retirement-wizard-step-2';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';

export const PlanRetirementWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PlanRetirementWizardFormData>({
    initialBalanceAvailability: 'balance_unavailable',
    initialBalance: 0,
    monthlyDeposit: 0
  });
  const handleFormDataChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleFormMoneyDataChange = ({ name, value }: NumberInputChangeValue) => {
    setFormData({ ...formData, [name]: value });
  };
  const goBack = () => setCurrentStep(currentStep - 1);
  const goForward = () => setCurrentStep(currentStep + 1);

  return (
    <Wizard currentStep={currentStep}>
      <PlanRetirementWizardStep1
        formData={formData}
        onChange={handleFormDataChange}
        onValueChange={handleFormMoneyDataChange}
        onNextButtonClick={goForward}
      />
      <PlanRetirementWizardStep2
        formData={formData}
        onValueChange={handleFormMoneyDataChange}
        onPreviousButtonClick={goBack}
      />
    </Wizard>
  );
};
