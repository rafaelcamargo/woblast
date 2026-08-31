import { customRender, mockRoute, screen } from '@src/base/services/testing';
import { App } from './app';

describe('App', () => {
  function buildPlanFormDataMock() {
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
    mockRoute('/');
    window.localStorage.clear();
  });

  it('should contain the homepage title on the document', async () => {
    mockRoute('/');
    customRender(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Página inicial' })).toBeInTheDocument();
  });

  it('should contain a plans view', async () => {
    mockRoute('/plans');
    customRender(<App />);
    expect(await screen.findByRole('heading', { name: 'Meus Planos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Você ainda não tem um plano' })).toBeInTheDocument();
    expect(screen.getByText('Quanto antes você começa, mais fácil fica a caminhada. Construa seu plano agora mesmo!')).toBeInTheDocument();
  });

  it('should render plans new view', async () => {
    mockRoute('/plans/new');
    customRender(<App />);
    expect(await screen.findByRole('heading', { level: 2, name: 'Saldo inicial' })).toBeInTheDocument();
  });

  it('should render plan details view', async () => {
    window.localStorage.setItem('wt_retirementPlanFormData', JSON.stringify(buildPlanFormDataMock()));
    mockRoute('/plans/temp');
    customRender(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Plano criado!' })).toBeInTheDocument();
  });
});
