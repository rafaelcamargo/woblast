import { customRender, screen, TestingRouter } from '@src/base/services/testing';
import type { PlanParams } from '@src/plans/types/plan-params';
import PlansView from './plans-view';

describe('Plans View', () => {
  function mount() {
    return customRender(
      <TestingRouter routePath="/plans" currentRoute="/plans">
        <PlansView />
      </TestingRouter>
    );
  }

  function buildPlan(overrides: Partial<PlanParams> = {}): PlanParams {
    return {
      id: 'plan1id',
      name: 'Plan 1',
      type: 'retirement',
      created_at: new Date(2026, 7, 18).toISOString(),
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
      buildPlan(),
      buildPlan({
        id: 'plan2id',
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

  it('should display a view link for a plan that navigates to the plan details page', () => {
    window.localStorage.setItem('wt_plans', JSON.stringify([buildPlan({ id: '123abc' })]));
    mount();
    expect(screen.getByRole('link', { name: 'Visualizar' })).toHaveAttribute('href', '/plans/123abc');
  });
});
