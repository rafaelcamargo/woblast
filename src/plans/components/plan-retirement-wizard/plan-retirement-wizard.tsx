import { useState } from 'react';
import { Wizard } from '@src/base/components/wizard/wizard';
import { PlanRetirementWizardStep1 } from '@src/plans/components/plan-retirement-wizard-step-1/plan-retirement-wizard-step-1';
import type { PlanRetirementWizardFormData } from '@src/plans/types/plan-retirement-wizard-form-data';

export const PlanRetirementWizard = () => {
  const [formData, setFormData] = useState<PlanRetirementWizardFormData>({
    initialBalanceAvailability: 'balance_unavailable',
    initialBalance: '0'
  });
  const handleFormDataChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Wizard currentStep={1}>
      <PlanRetirementWizardStep1
        formData={formData}
        onChange={handleFormDataChange}
      />
    </Wizard>
  );
};
