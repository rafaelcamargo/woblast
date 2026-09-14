import { customRender, screen, TestingRouter } from '@src/base/services/testing';
import useCustomHistoryMock from '@src/base/mocks/useCustomHistory';
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
  });

  afterEach(() => {
    useCustomHistoryMock.deactivate();
  });

  it('should contain a wizard to plan retirement', async () => {
    useCustomHistoryMock.activate();
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
    expect(screen.getByRole('button', { name: 'Concluir' })).toBeDisabled();
    await user.type(screen.getByRole('textbox', { name: 'Valor da renda mensal desejada' }), '500000');
    const doneButton = screen.getByRole('button', { name: 'Concluir' });
    expect(doneButton).toBeEnabled();
    expect(doneButton).toHaveAttribute('form', 'planRetirementWizardStep6Form');
    await user.click(doneButton);
    expect(useCustomHistoryMock.push).toHaveBeenCalledWith('/plans/preview');
    expect(JSON.parse(window.localStorage.getItem('wt_retirementPlanDraft') as string)).toEqual({
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
