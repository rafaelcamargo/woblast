import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import dateService from '@src/base/services/date';

type RetirementService = {
  buildPlan: (data: RetirementPlanFormData) => RetirementPlan
}

type RetirementPlan = {
  date: string
  balance: number
  interests: number
}

type SimulationMonth = {
  id: number
  date: Date
  balance: number
  interests: number
  deposit: number
}

const _public = {} as RetirementService;

_public.buildPlan = data => {
  const retirementPlanParams = buildRetirementParams(data);
  const lastMonth = simulate(buildInitialMonth(retirementPlanParams), retirementPlanParams);
  return {
    date: formatPlanDate(lastMonth.date),
    balance: lastMonth.balance,
    interests: lastMonth.interests
  };
};

function buildRetirementParams(data: RetirementPlanFormData): RetirementPlanParams {
  return {
    initialBalance: data.initialBalance,
    monthlyDeposit: data.monthlyDeposit,
    averageAnnualReturn: data.averageAnnualReturn,
    averageAnnualInflation: data.averageAnnualInflation,
    averageTaxRate: data.averageTaxRate,
    desiredMonthlyIncome: data.desiredMonthlyIncome
  } as RetirementPlanParams;
}

function simulate(currentMonth: SimulationMonth, options: RetirementPlanParams): SimulationMonth {
  return currentMonth.interests > options.desiredMonthlyIncome
    ? currentMonth
    : simulateNextMonth(currentMonth, options);
}

function simulateNextMonth(currentMonth: SimulationMonth, options: RetirementPlanParams) {
  const nextOptions = shouldAdjustYearlyValues(currentMonth) ? applyInflation(options) : options;
  return simulate(calculatePerformance(currentMonth, nextOptions), nextOptions);
}

function shouldAdjustYearlyValues({ id }: SimulationMonth) {
  return id !== 0 && id % 12 === 0;
}

function applyInflation(options: RetirementPlanParams) {
  const inflationFactor = 1 + options.averageAnnualInflation / 100;
  return {
    ...options,
    desiredMonthlyIncome: options.desiredMonthlyIncome * inflationFactor,
    monthlyDeposit: options.monthlyDeposit * inflationFactor
  };
}

function calculatePerformance({ id, date, balance }: SimulationMonth, options: RetirementPlanParams) {
  const interests = balance * getMonthlyProfitability(options);
  const deposit = options.monthlyDeposit;
  return {
    id: id + 1,
    date: incrementDate(date),
    balance: balance + interests + deposit,
    interests,
    deposit
  };
}

function getMonthlyProfitability({ averageAnnualReturn, averageTaxRate }: RetirementPlanParams) {
  return (averageAnnualReturn * ((100 - averageTaxRate) / 100)) / 12 / 100;
}

function buildInitialMonth({ initialBalance }: RetirementPlanParams) {
  return {
    id: 0,
    date: buildStartDate(),
    balance: initialBalance,
    interests: 0,
    deposit: 0
  };
}

function incrementDate(date: Date) {
  const currentMonth = date.getMonth();
  const newYear = currentMonth === 11 ? date.getFullYear() + 1 : date.getFullYear();
  const newMonth = currentMonth < 11 ? currentMonth + 1 : 0;
  return new Date(newYear, newMonth);
}

function buildStartDate() {
  const startDate = dateService.getNow();
  return new Date(startDate.getFullYear(), startDate.getMonth());
}

function formatPlanDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${month}-${year}`;
}

export default _public;
