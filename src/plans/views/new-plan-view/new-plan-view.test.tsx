import { customRender, fireEvent, screen, TestingRouter } from '@src/base/services/testing';
import idService from '@src/base/services/id';
import NewPlanView from './new-plan-view';

describe('New Plan View', () => {
  function mount() {
    return customRender(
      <TestingRouter routePath="/plans/new" currentRoute="/plans/new">
        <NewPlanView />
      </TestingRouter>
    );
  }

  beforeEach(() => {
    window.localStorage.clear();
    idService.generateId = jest.fn(() => 'a1B2c3');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should contain a wizard to plan retirement', async () => {
    const { user } = mount();
    expect(screen.getByRole('heading', { level: 2, name: 'Saldo inicial' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeEnabled();
    await user.click(screen.getByRole('radio', { name: 'Já tenho uma caixinha' }));
    expect(screen.getByRole('textbox', { name: 'Saldo inicial' })).toHaveValue('0,00');
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
    await user.type(screen.getByRole('textbox', { name: 'Saldo inicial' }), '1000000');
    await user.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Depósitos mensais' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
    await user.type(screen.getByRole('textbox', { name: 'Valor do depósito mensal' }), '200000');
    await user.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Rentabilidade prevista' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
    await user.type(screen.getByRole('textbox', { name: 'Rentabilidade anual média' }), '950');
    await user.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Inflação prevista' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
    await user.type(screen.getByRole('textbox', { name: 'Inflação anual média' }), '450');
    await user.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Impostos' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
    await user.type(screen.getByRole('textbox', { name: 'Alíquota média de impostos' }), '1500');
    await user.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Renda mensal desejada' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Concluir' })).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(screen.getByRole('link', { name: 'Concluir' }));
    await user.type(screen.getByRole('textbox', { name: 'Valor da renda mensal desejada' }), '500000');
    const doneButton = screen.getByRole('link', { name: 'Concluir' });
    expect(doneButton).toHaveAttribute('aria-disabled', 'false');
    expect(doneButton).toHaveAttribute('href', '/plans/a1B2c3');
    expect(JSON.parse(window.localStorage.getItem('wt_retirementPlanFormData') as string)).toEqual({
      id: 'a1B2c3',
      initialBalanceAvailability: 'balance_available',
      initialBalance: 10000,
      monthlyDeposit: 2000,
      averageAnnualReturn: 9.5,
      averageAnnualInflation: 4.5,
      averageTaxRate: 15,
      desiredMonthlyIncome: 5000
    });
  });

  it('should not render previous button on the first step of retirement plan wizard', () => {
    mount();
    expect(screen.queryByRole('button', { name: 'Anterior' })).not.toBeInTheDocument();
  });

  it('should allow users to go back to the previous step if they\'re not on first one', async () => {
    const { user } = mount();
    await user.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Depósitos mensais' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Anterior' }));
    expect(screen.getByRole('heading', { level: 2, name: 'Saldo inicial' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Anterior' })).not.toBeInTheDocument();
  });
});
