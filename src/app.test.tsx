import { customRender, mockRoute, screen } from '@src/base/services/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    mockRoute('/');
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
});
