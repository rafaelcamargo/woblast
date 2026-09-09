import { customRender, screen, TestingRouter, within } from '@src/base/services/testing';
import type { RetirementPlanFormData } from '@src/plans/types/retirement-plan-form-data';
import useCustomHistoryMock from '@src/base/mocks/useCustomHistory';
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
      id: 'a1B2c3',
      initialBalanceAvailability: 'balance_available',
      initialBalance: 80000,
      monthlyDeposit: 2000,
      averageAnnualReturn: 9.5,
      averageAnnualInflation: 4.5,
      averageTaxRate: 15,
      desiredMonthlyIncome: 800
    };
  }

  beforeEach(() => {
    window.localStorage.clear();
    dateService.getNow = jest.fn(() => new Date(2025, 11, 30));
  });

  afterEach(() => {
    useCustomHistoryMock.deactivate();
    jest.restoreAllMocks();
  });

  it('should show the retirement result calculated from the temporary plan stored in local storage', () => {
    mockPlanFormData(buildPlanFormData());
    mount({ currentRoute: '/plans/a1B2c3' });
    expect(screen.getByRole('heading', { level: 1, name: 'Plano criado!' })).toBeInTheDocument();
    expect(document.getElementById('retirementResultDescription')?.textContent).toEqual('Você poderá se aposentar em junho de 2027 quando o montante alcançar R$\u00a0128.948,74 e estiver rendendo R$\u00a0847,95 ao mês, já descontados os impostos.');
  });

  it('should not calculate a retirement result when the plan id is not temporary', () => {
    jest.spyOn(retirementService, 'buildPlan');
    mockPlanFormData(buildPlanFormData());
    mount({ currentRoute: '/plans/abc' });
    expect(retirementService.buildPlan).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { level: 1, name: 'Plano criado!' })).toBeInTheDocument();
    expect(document.getElementById('retirementResultDescription')).not.toBeInTheDocument();
  });

  it('should show simulation months grouped by year', async () => {
    mockPlanFormData(buildPlanFormData());
    const { user } = mount({ currentRoute: '/plans/a1B2c3' });
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
    const { user } = mount({ currentRoute: '/plans/a1B2c3' });
    await user.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Fechar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should be able to save plan params into plans collection', async () => {
    useCustomHistoryMock.activate();
    mockPlanFormData(buildPlanFormData());
    const { user } = mount({ currentRoute: '/plans/a1B2c3' });
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
      initialBalance: 80000,
      monthlyDeposit: 2000,
      averageAnnualReturn: 9.5,
      averageAnnualInflation: 4.5,
      averageTaxRate: 15,
      desiredMonthlyIncome: 800,
      name: 'Plan 1',
      created_at: new Date(2025, 11, 30).toISOString()
    }]);
    expect(useCustomHistoryMock.push).toHaveBeenCalledWith('/plans');
  });

  it('should add aditional plan params into plans collection', async () => {
    useCustomHistoryMock.activate();
    window.localStorage.setItem('wt_plans', JSON.stringify([{
      initialBalance: 10000,
      monthlyDeposit: 500,
      averageAnnualReturn: 8,
      averageAnnualInflation: 4,
      averageTaxRate: 15,
      desiredMonthlyIncome: 400,
      created_at: '2024-01-15T00:00:00.000Z'
    }]));
    mockPlanFormData(buildPlanFormData());
    const { user } = mount({ currentRoute: '/plans/a1B2c3' });
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
        initialBalance: 10000,
        monthlyDeposit: 500,
        averageAnnualReturn: 8,
        averageAnnualInflation: 4,
        averageTaxRate: 15,
        desiredMonthlyIncome: 400,
        created_at: '2024-01-15T00:00:00.000Z'
      },
      {
        initialBalance: 80000,
        monthlyDeposit: 2000,
        averageAnnualReturn: 9.5,
        averageAnnualInflation: 4.5,
        averageTaxRate: 15,
        desiredMonthlyIncome: 800,
        name: 'Plan 1',
        created_at: new Date(2025, 11, 30).toISOString()
      }
    ]);
    expect(useCustomHistoryMock.push).toHaveBeenCalledWith('/plans');
  });
});
