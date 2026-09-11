export type RetirementPlanFormData = {
  initialBalanceAvailability: 'balance_unavailable' | 'balance_available';
  initialBalance: number | undefined;
  monthlyDeposit: number | undefined;
  averageAnnualReturn: number | undefined;
  averageAnnualInflation: number | undefined;
  averageTaxRate: number | undefined;
  desiredMonthlyIncome: number | undefined;
};
