import { customRender, mockRoute, screen, within } from '@src/base/services/testing';
import dateService from '@src/base/services/date';
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

  function buildSavedPlanMock() {
    return {
      id: 'a1B2c3',
      name: 'Saved Plan',
      type: 'retirement',
      created_at: new Date(2025, 11, 30).toISOString(),
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
    dateService.getNow = jest.fn(() => new Date(2025, 11, 30));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should contain the homepage title on the document', async () => {
    mockRoute('/');
    customRender(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Planejar a aposentadoria não deveria ser complicado' })).toBeInTheDocument();
  });

  it('should contain a plans view', async () => {
    mockRoute('/plans');
    customRender(<App />);
    expect(await screen.findByRole('heading', { name: 'Meus Planos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Você ainda não tem um plano' })).toBeInTheDocument();
    expect(screen.getByText('Quanto antes você começa, mais fácil fica a caminhada. Construa seu plano agora mesmo!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Criar Plano' })).toHaveAttribute('href', '/plans/new');
  });

  it('should render plans new view', async () => {
    mockRoute('/plans/new');
    customRender(<App />);
    expect(await screen.findByRole('heading', { level: 2, name: 'Saldo inicial' })).toBeInTheDocument();
  });

  it('should render plan details view', async () => {
    window.localStorage.setItem('wt_plans', JSON.stringify([buildSavedPlanMock()]));
    mockRoute('/plans/a1B2c3');
    const { container } = customRender(<App />);
    expect(await screen.findByText('junho 2046')).toBeInTheDocument();
    const summary = container.querySelector('#planDetailsSummary') as HTMLElement;
    expect(within(summary).getByText('junho 2046')).toBeInTheDocument();
    expect(within(summary).getByText('1.811.536,79')).toBeInTheDocument();
    expect(within(summary).getByText('12.076,41')).toBeInTheDocument();
  });

  it('should render plan preview view', async () => {
    window.localStorage.setItem('wt_retirementPlanDraft', JSON.stringify(buildPlanFormDataMock()));
    mockRoute('/plans/preview');
    const { container } = customRender(<App />);
    expect(await screen.findByText('junho 2046')).toBeInTheDocument();
    const summary = container.querySelector('#planDetailsSummary') as HTMLElement;
    expect(within(summary).getByText('junho 2046')).toBeInTheDocument();
    expect(within(summary).getByText('1.811.536,79')).toBeInTheDocument();
    expect(within(summary).getByText('12.076,41')).toBeInTheDocument();
  });
});
