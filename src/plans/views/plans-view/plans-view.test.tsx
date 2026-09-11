import { customRender, screen, TestingRouter } from '@src/base/services/testing';
import type { RetirementPlanParams } from '@src/plans/types/retirement-plan-params';
import PlansView from './plans-view';

describe('Plans View', () => {
  function mount() {
    return customRender(
      <TestingRouter routePath="/plans" currentRoute="/plans">
        <PlansView />
      </TestingRouter>
    );
  }

  function buildPlan(overrides: Partial<RetirementPlanParams> = {}): RetirementPlanParams {
    return {
      initialBalance: 10000,
      monthlyDeposit: 500,
      averageAnnualReturn: 8,
      averageAnnualInflation: 4,
      averageTaxRate: 15,
      desiredMonthlyIncome: 400,
      ...overrides
    };
  }

  function mockPlans() {
    window.localStorage.setItem('wt_plans', JSON.stringify([
      buildPlan({
        name: 'Plan 1',
        created_at: new Date(2026, 7, 18).toISOString()
      }),
      buildPlan({
        name: 'Plan 2',
        created_at: new Date(2026, 2, 10).toISOString()
      })
    ]));
  }

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should display plans from local storage with formatted dates and a link to create a new plan', () => {
    mockPlans();
    mount();
    expect(screen.getByText('Plan 1')).toBeInTheDocument();
    expect(screen.getByText('Plan 2')).toBeInTheDocument();
    expect(screen.getByText('18 AGO 2026')).toBeInTheDocument();
    expect(screen.getByText('10 MAR 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Criar Plano' })).toHaveAttribute('href', '/plans/new');
  });
});
