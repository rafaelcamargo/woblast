import { customRender, screen } from '@src/base/services/testing';
import { MoneyInput } from './money-input';

describe('Money Input', () => {
  function mount(props: Partial<React.ComponentProps<typeof MoneyInput>> = {}) {
    return customRender(<MoneyInput name='amount' {...props} />);
  }

  it('should render a decimal text input with zero as default', () => {
    mount();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputmode', 'decimal');
    expect(input).toHaveValue('0,00');
  });

  it('should format typed digits as currency without a symbol and notify the float value', async () => {
    const onChange = jest.fn();
    const onValueChange = jest.fn();
    const { user } = mount({ onChange, onValueChange });
    const input = screen.getByRole('textbox');
    await user.type(input, '123456');
    expect(input).toHaveValue('1.234,56');
    expect(onValueChange).toHaveBeenLastCalledWith(
      { name: 'amount', value: 1234.56 },
      expect.objectContaining({ target: input })
    );
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.lastCall[0].target.value).toBe('1.234,56');
  });

  it('should remove the last digit on backspace', async () => {
    const onValueChange = jest.fn();
    const { user } = mount({ onValueChange });
    const input = screen.getByRole('textbox');
    await user.type(input, '123{Backspace}');
    expect(input).toHaveValue('0,12');
    expect(onValueChange).toHaveBeenLastCalledWith(
      { name: 'amount', value: 0.12 },
      expect.objectContaining({ target: input })
    );
  });

  it('should ignore letters, minus and arrow keys', async () => {
    const onValueChange = jest.fn();
    const { user } = mount({ onValueChange });
    const input = screen.getByRole('textbox');
    await user.type(input, '10');
    await user.keyboard('{ArrowLeft}{ArrowLeft}-a');
    expect(input).toHaveValue('0,10');
    expect(onValueChange).toHaveBeenLastCalledWith(
      { name: 'amount', value: 0.1 },
      expect.objectContaining({ target: input })
    );
  });

  it('should replace the value when a digit is typed after select all', async () => {
    const onValueChange = jest.fn();
    const { user } = mount({ onValueChange });
    const input = screen.getByRole('textbox');
    await user.type(input, '1000');
    await user.keyboard('{Control>}a{/Control}5');
    expect(input).toHaveValue('0,05');
    expect(onValueChange).toHaveBeenLastCalledWith(
      { name: 'amount', value: 0.05 },
      expect.objectContaining({ target: input })
    );
  });

  it('should keep only digits from pasted text', async () => {
    const onValueChange = jest.fn();
    const { user } = mount({ onValueChange });
    const input = screen.getByRole('textbox');
    input.focus();
    await user.paste('abc12');
    expect(input).toHaveValue('0,12');
    expect(onValueChange).toHaveBeenLastCalledWith(
      { name: 'amount', value: 0.12 },
      expect.objectContaining({ target: input })
    );
  });
});
