import { customRender, screen } from '@src/base/services/testing';
import { Logo } from './logo';

describe('Logo', () => {
  it('should render symbol-only logo by default', () => {
    const { container } = customRender(<Logo />);
    expect(container.querySelectorAll('[data-shape-type="wordmark"]')).toHaveLength(0);
    expect(container.querySelectorAll('[data-shape-type="mark"]')).toHaveLength(3);
    expect(screen.getByRole('img', { name: 'Logotipo Woblast' })).toHaveAttribute('viewBox', '0 0 55 40');
    expect(screen.getByRole('img', { name: 'Logotipo Woblast' })).toHaveClass('wt-logo');
    expect(screen.getByRole('img', { name: 'Logotipo Woblast' })).not.toHaveClass('has-wordmark');
  });

  it('should optionally render logo wordmark', () => {
    const { container } = customRender(<Logo wordmark />);
    expect(container.querySelectorAll('[data-shape-type="wordmark"]')).toHaveLength(7);
    expect(container.querySelectorAll('[data-shape-type="mark"]')).toHaveLength(3);
    expect(screen.getByRole('img', { name: 'Logotipo Woblast' })).toHaveAttribute('viewBox', '0 0 200 40');
    expect(screen.getByRole('img', { name: 'Logotipo Woblast' })).toHaveClass('wt-logo', 'has-wordmark');
  });
});
