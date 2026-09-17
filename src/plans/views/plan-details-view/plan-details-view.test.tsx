import { customRender, screen, TestingRouter, within } from '@src/base/services/testing';
import type { RetirementPlanDraft } from '@src/plans/types/retirement-plan-draft';
import type { PlanParams } from '@src/plans/types/plan-params';
import useCustomHistoryMock from '@src/base/mocks/useCustomHistory';
import dateService from '@src/base/services/date';
import idService from '@src/base/services/id';
import PlanDetailsView from './plan-details-view';

type MountProps = {
  routePath: string
  currentRoute: string
};

describe('Plan Details View', () => {
  function mount({ routePath, currentRoute }: MountProps) {
    return customRender(
      <TestingRouter routePath={routePath} currentRoute={currentRoute}>
        <PlanDetailsView />
      </TestingRouter>
    );
  }

  function mockPlanFormData(data: RetirementPlanDraft) {
    window.localStorage.setItem('wt_retirementPlanDraft', JSON.stringify(data));
  }

  function buildPlanFormData(): RetirementPlanDraft {
    return {
      initialBalanceAvailability: 'balance_available',
      initialBalance: 80000,
      monthlyDeposit: 2000,
      averageAnnualReturn: 9.5,
      averageAnnualInflation: 4.5,
      averageTaxRate: 15,
      desiredMonthlyIncome: 800
    };
  }

  function buildSavedPlan(overrides: Partial<PlanParams> = {}): PlanParams {
    return {
      id: 'a1B2c3',
      name: 'Saved Plan',
      type: 'retirement',
      created_at: new Date(2025, 11, 30).toISOString(),
      initialBalance: 80000,
      monthlyDeposit: 2000,
      averageAnnualReturn: 9.5,
      averageAnnualInflation: 4.5,
      averageTaxRate: 15,
      desiredMonthlyIncome: 800,
      ...overrides
    };
  }

  beforeEach(() => {
    window.localStorage.clear();
    dateService.getNow = jest.fn(() => new Date(2025, 11, 30));
    idService.generateId = jest.fn(() => 'a1B2c3');
  });

  afterEach(() => {
    useCustomHistoryMock.deactivate();
    jest.restoreAllMocks();
  });

  it('should show the retirement result calculated from the temporary plan stored in local storage', () => {
    mockPlanFormData(buildPlanFormData());
    const { container } = mount({ routePath: '/plans/preview', currentRoute: '/plans/preview' });
    const summary = container.querySelector('#planDetailsSummary') as HTMLElement;
    const items = within(summary).getAllByRole('listitem');
    expect(items[0].querySelector('.wt-icon-calendar')).toBeInTheDocument();
    expect(within(items[0]).getByText('Início aposentadoria')).toBeInTheDocument();
    expect(within(items[0]).getByText('junho 2027')).toBeInTheDocument();
    expect(items[1].querySelector('.wt-icon-vault')).toBeInTheDocument();
    expect(within(items[1]).getByText('Montante')).toBeInTheDocument();
    expect(within(items[1]).getByText('128.948,74')).toBeInTheDocument();
    expect(items[2].querySelector('.wt-icon-coins')).toBeInTheDocument();
    expect(within(items[2]).getByText('Rendimentos')).toBeInTheDocument();
    expect(within(items[2]).getByText('847,95')).toBeInTheDocument();
  });

  it('should not calculate a retirement result when temporary plan data is not available', () => {
    const { container } = mount({ routePath: '/plans/preview', currentRoute: '/plans/preview' });
    expect(container.querySelector('#planDetailsSummary')).toBeNull();
  });

  it('should show simulation months grouped by year', async () => {
    mockPlanFormData(buildPlanFormData());
    const { user } = mount({ routePath: '/plans/preview', currentRoute: '/plans/preview' });
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ano Anterior' })).toBeDisabled();
    expect(screen.getByRole('columnheader', { name: 'Mês' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Depósito' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Montante' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Rendimentos' })).toBeInTheDocument();
    const firstRowCells = within(screen.getAllByRole('row')[1]).getAllByRole('cell');
    expect(firstRowCells[0]).toHaveTextContent('jan');
    expect(firstRowCells[1]).toHaveTextContent('2.000,00');
    expect(firstRowCells[2]).toHaveTextContent('82.538,33');
    expect(firstRowCells[3]).toHaveTextContent('538,33');
    await user.click(screen.getByRole('button', { name: 'Próximo Ano' }));
    expect(screen.getByText('2027')).toBeInTheDocument();
    expect(screen.queryByText('2026')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo Ano' })).toBeDisabled();
    const rows = screen.getAllByRole('row');
    const lastRowCells = within(rows[rows.length - 1]).getAllByRole('cell');
    expect(lastRowCells[0]).toHaveTextContent('jun');
    expect(lastRowCells[1]).toHaveTextContent('2.090,00');
    expect(lastRowCells[2]).toHaveTextContent('128.948,74');
    expect(lastRowCells[3]).toHaveTextContent('847,95');
    await user.click(screen.getByRole('button', { name: 'Ano Anterior' }));
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.queryByText('2027')).not.toBeInTheDocument();
  });

  it('should close plan dialog when close button is clicked', async () => {
    mockPlanFormData(buildPlanFormData());
    const { user } = mount({ routePath: '/plans/preview', currentRoute: '/plans/preview' });
    await user.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Fechar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should be able to save plan params into plans collection', async () => {
    useCustomHistoryMock.activate();
    mockPlanFormData(buildPlanFormData());
    const { user } = mount({ routePath: '/plans/preview', currentRoute: '/plans/preview' });
    await user.click(screen.getByRole('button', { name: 'Salvar' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Salvar plano' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
    expect(window.localStorage.getItem('wt_plans')).toBeNull();
    const saveButton = within(dialog).getByRole('button', { name: 'Salvar' });
    expect(saveButton).toBeDisabled();
    await user.type(within(dialog).getByRole('textbox', { name: 'Nome do plano' }), '   ');
    expect(saveButton).toBeDisabled();
    await user.clear(within(dialog).getByRole('textbox', { name: 'Nome do plano' }));
    await user.type(within(dialog).getByRole('textbox', { name: 'Nome do plano' }), 'Plan 1');
    expect(saveButton).toBeEnabled();
    await user.click(saveButton);
    expect(JSON.parse(window.localStorage.getItem('wt_plans') as string)).toEqual([{
      id: 'a1B2c3',
      name: 'Plan 1',
      type: 'retirement',
      initialBalance: 80000,
      monthlyDeposit: 2000,
      averageAnnualReturn: 9.5,
      averageAnnualInflation: 4.5,
      averageTaxRate: 15,
      desiredMonthlyIncome: 800,
      created_at: new Date(2025, 11, 30).toISOString()
    }]);
    expect(window.localStorage.getItem('wt_retirementPlanDraft')).toBeNull();
    expect(useCustomHistoryMock.push).toHaveBeenCalledWith('/plans');
  });

  it('should add aditional plan params into plans collection', async () => {
    useCustomHistoryMock.activate();
    window.localStorage.setItem('wt_plans', JSON.stringify([{
      id: 'existing1',
      name: 'Existing Plan',
      type: 'retirement',
      initialBalance: 10000,
      monthlyDeposit: 500,
      averageAnnualReturn: 8,
      averageAnnualInflation: 4,
      averageTaxRate: 15,
      desiredMonthlyIncome: 400,
      created_at: '2024-01-15T00:00:00.000Z'
    }]));
    mockPlanFormData(buildPlanFormData());
    const { user } = mount({ routePath: '/plans/preview', currentRoute: '/plans/preview' });
    await user.click(screen.getByRole('button', { name: 'Salvar' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Salvar plano' })).toBeInTheDocument();
    const saveButton = within(dialog).getByRole('button', { name: 'Salvar' });
    expect(saveButton).toBeDisabled();
    await user.type(within(dialog).getByRole('textbox', { name: 'Nome do plano' }), '   ');
    expect(saveButton).toBeDisabled();
    await user.clear(within(dialog).getByRole('textbox', { name: 'Nome do plano' }));
    await user.type(within(dialog).getByRole('textbox', { name: 'Nome do plano' }), 'Plan 1');
    expect(saveButton).toBeEnabled();
    await user.click(saveButton);
    expect(JSON.parse(window.localStorage.getItem('wt_plans') as string)).toEqual([
      {
        id: 'existing1',
        name: 'Existing Plan',
        type: 'retirement',
        initialBalance: 10000,
        monthlyDeposit: 500,
        averageAnnualReturn: 8,
        averageAnnualInflation: 4,
        averageTaxRate: 15,
        desiredMonthlyIncome: 400,
        created_at: '2024-01-15T00:00:00.000Z'
      },
      {
        id: 'a1B2c3',
        name: 'Plan 1',
        type: 'retirement',
        initialBalance: 80000,
        monthlyDeposit: 2000,
        averageAnnualReturn: 9.5,
        averageAnnualInflation: 4.5,
        averageTaxRate: 15,
        desiredMonthlyIncome: 800,
        created_at: new Date(2025, 11, 30).toISOString()
      }
    ]);
    expect(window.localStorage.getItem('wt_retirementPlanDraft')).toBeNull();
    expect(useCustomHistoryMock.push).toHaveBeenCalledWith('/plans');
  });

  it('should show retirement result from saved plan and hide save button', () => {
    window.localStorage.setItem('wt_plans', JSON.stringify([buildSavedPlan()]));
    const { container } = mount({ routePath: '/plans/:planId', currentRoute: '/plans/a1B2c3' });
    const summary = container.querySelector('#planDetailsSummary') as HTMLElement;
    const items = within(summary).getAllByRole('listitem');
    expect(items[0].querySelector('.wt-icon-calendar')).toBeInTheDocument();
    expect(within(items[0]).getByText('Início aposentadoria')).toBeInTheDocument();
    expect(within(items[0]).getByText('junho 2027')).toBeInTheDocument();
    expect(items[1].querySelector('.wt-icon-vault')).toBeInTheDocument();
    expect(within(items[1]).getByText('Montante')).toBeInTheDocument();
    expect(within(items[1]).getByText('128.948,74')).toBeInTheDocument();
    expect(items[2].querySelector('.wt-icon-coins')).toBeInTheDocument();
    expect(within(items[2]).getByText('Rendimentos')).toBeInTheDocument();
    expect(within(items[2]).getByText('847,95')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Salvar' })).not.toBeInTheDocument();
  });

  it('should not show retirement result when saved plan id does not exist', () => {
    const { container } = mount({ routePath: '/plans/:planId', currentRoute: '/plans/abc' });
    expect(container.querySelector('#planDetailsSummary')).toBeNull();
  });
});
