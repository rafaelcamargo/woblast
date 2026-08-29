import { useState } from 'react';
import type { NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { Wizard } from '@src/base/components/wizard/wizard';
import { PlanRetirementWizardStep1 } from '@src/plans/components/plan-retirement-wizard-step-1/plan-retirement-wizard-step-1';
import { PlanRetirementWizardStep2 } from '@src/plans/components/plan-retirement-wizard-step-2/plan-retirement-wizard-step-2';
import { PlanRetirementWizardStep3 } from '@src/plans/components/plan-retirement-wizard-step-3/plan-retirement-wizard-step-3';
import { PlanRetirementWizardStep4 } from '@src/plans/components/plan-retirement-wizard-step-4/plan-retirement-wizard-step-4';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';

export const PlanRetirementWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PlanRetirementWizardFormData>({
    initialBalanceAvailability: 'balance_unavailable',
    initialBalance: 0,
    monthlyDeposit: 0,
    averageAnnualReturn: 0,
    averageAnnualInflation: 0
  });
  const handleFormDataChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleMoneyFormDataChange = ({ name, value }: NumberInputChangeValue) => {
    setFormData({ ...formData, [name]: value });
  };
  const goBack = () => setCurrentStep(currentStep - 1);
  const goForward = () => setCurrentStep(currentStep + 1);

  return (
    <Wizard currentStep={currentStep}>
      <PlanRetirementWizardStep1
        formData={formData}
        onChange={handleFormDataChange}
        onValueChange={handleMoneyFormDataChange}
        onNextButtonClick={goForward}
      />
      <PlanRetirementWizardStep2
        formData={formData}
        onValueChange={handleMoneyFormDataChange}
        onPreviousButtonClick={goBack}
        onNextButtonClick={goForward}
      />
      <PlanRetirementWizardStep3
        formData={formData}
        onValueChange={handleMoneyFormDataChange}
        onPreviousButtonClick={goBack}
        onNextButtonClick={goForward}
      />
      <PlanRetirementWizardStep4
        formData={formData}
        onValueChange={handleMoneyFormDataChange}
        onPreviousButtonClick={goBack}
      />
    </Wizard>
  );
};
