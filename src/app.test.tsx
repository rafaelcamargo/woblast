import { customRender, screen } from '@src/base/services/testing';
import { App } from './app';

describe('App', () => {
  it('should contain the homepage title on the document', async () => {
    customRender(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Página inicial' })).toBeInTheDocument();
  });
});
