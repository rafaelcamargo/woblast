import { useState } from 'react';
import { useLocalStorageState } from '@src/base/hooks/use-local-storage-state';
import idService from '@src/base/services/id';
import type { NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { Wizard } from '@src/base/components/wizard/wizard';
import { PlanRetirementWizardStep1 } from '@src/plans/components/plan-retirement-wizard-step-1/plan-retirement-wizard-step-1';
import { PlanRetirementWizardStep2 } from '@src/plans/components/plan-retirement-wizard-step-2/plan-retirement-wizard-step-2';
import { PlanRetirementWizardStep3 } from '@src/plans/components/plan-retirement-wizard-step-3/plan-retirement-wizard-step-3';
import { PlanRetirementWizardStep4 } from '@src/plans/components/plan-retirement-wizard-step-4/plan-retirement-wizard-step-4';
import { PlanRetirementWizardStep5 } from '@src/plans/components/plan-retirement-wizard-step-5/plan-retirement-wizard-step-5';
import { PlanRetirementWizardStep6 } from '@src/plans/components/plan-retirement-wizard-step-6/plan-retirement-wizard-step-6';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';

export const PlanRetirementWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useLocalStorageState<RetirementPlanFormData>('wt_retirementPlanFormData', {
    id: idService.generateId(),
    initialBalanceAvailability: 'balance_unavailable',
    initialBalance: 0,
    monthlyDeposit: 0,
    averageAnnualReturn: 0,
    averageAnnualInflation: 0,
    averageTaxRate: 0,
    desiredMonthlyIncome: 0
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
        onNextButtonClick={goForward}
      />
      <PlanRetirementWizardStep5
        formData={formData}
        onValueChange={handleMoneyFormDataChange}
        onPreviousButtonClick={goBack}
        onNextButtonClick={goForward}
      />
      <PlanRetirementWizardStep6
        formData={formData}
        onValueChange={handleMoneyFormDataChange}
        onPreviousButtonClick={goBack}
      />
    </Wizard>
  );
};
