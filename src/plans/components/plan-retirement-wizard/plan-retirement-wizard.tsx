import useCustomHistoryModule from '@src/base/hooks/use-custom-history';
import { useLocalStorageState } from '@src/base/hooks/use-local-storage-state';
import { useSearchParamsState } from '@src/base/hooks/use-search-params-state';
import type { NumberInputChangeValue } from '@src/base/components/number-input/number-input';
import { Wizard } from '@src/base/components/wizard/wizard';
import { PlanRetirementWizardStep1 } from '@src/plans/components/plan-retirement-wizard-step-1/plan-retirement-wizard-step-1';
import { PlanRetirementWizardStep2 } from '@src/plans/components/plan-retirement-wizard-step-2/plan-retirement-wizard-step-2';
import { PlanRetirementWizardStep3 } from '@src/plans/components/plan-retirement-wizard-step-3/plan-retirement-wizard-step-3';
import { PlanRetirementWizardStep4 } from '@src/plans/components/plan-retirement-wizard-step-4/plan-retirement-wizard-step-4';
import { PlanRetirementWizardStep5 } from '@src/plans/components/plan-retirement-wizard-step-5/plan-retirement-wizard-step-5';
import { PlanRetirementWizardStep6 } from '@src/plans/components/plan-retirement-wizard-step-6/plan-retirement-wizard-step-6';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';

export const PlanRetirementWizard = () => {
  const customHistory = useCustomHistoryModule.useCustomHistory();
  const [wizardSearchParams, setWizardSearchParams] = useSearchParamsState(
    { step: 1 },
    { step: 'number' }
  );
  const [formData, setFormData] = useLocalStorageState<RetirementPlanDraft>('wt_retirementPlanDraft', {
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
  const goBack = () => setWizardSearchParams(prev => ({ ...prev, step: prev.step - 1 }));
  const goForward = () => setWizardSearchParams(prev => ({ ...prev, step: prev.step + 1 }));
  const goToPreview = () => customHistory.push('/plans/preview');

  return (
    <div className="wt-plan-retirement-wizard">
      <Wizard currentStep={wizardSearchParams.step}>
        <PlanRetirementWizardStep1
          formData={formData}
          onChange={handleFormDataChange}
          onValueChange={handleMoneyFormDataChange}
          onSubmit={goForward}
        />
        <PlanRetirementWizardStep2
          formData={formData}
          onValueChange={handleMoneyFormDataChange}
          onPreviousButtonClick={goBack}
          onSubmit={goForward}
        />
        <PlanRetirementWizardStep3
          formData={formData}
          onValueChange={handleMoneyFormDataChange}
          onPreviousButtonClick={goBack}
          onSubmit={goForward}
        />
        <PlanRetirementWizardStep4
          formData={formData}
          onValueChange={handleMoneyFormDataChange}
          onPreviousButtonClick={goBack}
          onSubmit={goForward}
        />
        <PlanRetirementWizardStep5
          formData={formData}
          onValueChange={handleMoneyFormDataChange}
          onPreviousButtonClick={goBack}
          onSubmit={goForward}
        />
        <PlanRetirementWizardStep6
          formData={formData}
          onValueChange={handleMoneyFormDataChange}
          onPreviousButtonClick={goBack}
          onSubmit={goToPreview}
        />
      </Wizard>
    </div>
  );
};
