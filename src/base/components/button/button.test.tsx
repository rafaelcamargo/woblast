import { Link } from 'react-router-dom';
import { customRender, screen, TestingRouter } from '@src/base/services/testing';
import { Button } from './button';

describe('Button', () => {
  it('should not navigate or call onClick when rendered as a disabled link', async () => {
    const onClick = jest.fn();
    const { user } = customRender(
      <TestingRouter routePath='/' currentRoute='/'>
        <Button
          element={Link}
          to='/plans/new'
          onClick={onClick}
          disabled
        >
          Go
        </Button>
      </TestingRouter>
    );
    const link = screen.getByRole('link', { name: 'Go' });
    expect(link).toHaveAttribute('href', '/plans/new');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
    expect(window.location.pathname).toEqual('/');
  });
});
