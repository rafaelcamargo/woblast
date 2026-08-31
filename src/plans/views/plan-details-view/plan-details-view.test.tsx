import { customRender, screen, TestingRouter } from '@src/base/services/testing';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import dateService from '@src/base/services/date';
import retirementService from '@src/plans/services/retirement';
import PlanDetailsView from './plan-details-view';

type MountProps = {
  currentRoute: string
};

describe('Plan Details View', () => {
  function mount({ currentRoute }: MountProps) {
    return customRender(
      <TestingRouter routePath="/plans/:planId" currentRoute={currentRoute}>
        <PlanDetailsView />
      </TestingRouter>
    );
  }

  function mockPlanFormData(data: RetirementPlanFormData){
    window.localStorage.setItem('wt_retirementPlanFormData', JSON.stringify(data));
  }

  function buildPlanFormData(): RetirementPlanFormData {
    return {
      initialBalanceAvailability: 'balance_available',
      initialBalance: 10000,
      monthlyDeposit: 2000,
      averageAnnualReturn: 9.5,
      averageAnnualInflation: 4.5,
      averageTaxRate: 15,
      desiredMonthlyIncome: 5000
    };
  }

  beforeEach(() => {
    window.localStorage.clear();
    dateService.getNow = jest.fn(() => new Date(2026, 7, 30));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should show the retirement result calculated from the temporary plan stored in local storage', () => {
    mockPlanFormData(buildPlanFormData());
    mount({ currentRoute: '/plans/temp' });
    expect(screen.getByRole('heading', { level: 1, name: 'Plano criado!' })).toBeInTheDocument();
    expect(screen.getByText('Você poderá se aposentar em fevereiro de 2047 quando o montante alcançar R$ 1.811.536,79 e estiver rendendo R$ 12.076,41 ao mês, já descontados os impostos.')).toBeInTheDocument();
  });

  it('should not calculate a retirement result when the plan id is not temporary', () => {
    retirementService.buildPlan = jest.fn();
    mockPlanFormData(buildPlanFormData());
    mount({ currentRoute: '/plans/abc' });
    expect(retirementService.buildPlan).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { level: 1, name: 'Plano criado!' })).toBeInTheDocument();
    expect(screen.queryByText('Você poderá se aposentar em fevereiro de 2047 quando o montante alcançar R$ 1.811.536,79 e estiver rendendo R$ 12.076,41 ao mês, já descontados os impostos.')).not.toBeInTheDocument();
  });
});
