import { useEffect, useState } from 'react';

const DEFAULT_LOCALE = 'pt-BR';
const DEFAULT_CURRENCY = 'BRL';

export type MoneyInputChangeValue = {
  name: string
  value: number
}

type MoneyInputProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'type' | 'inputMode' | 'value'
> & {
  name: string
  value?: number
  onValueChange?: (
    nextValue: MoneyInputChangeValue,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}

export const MoneyInput = ({
  name,
  value,
  onChange,
  onValueChange,
  onKeyDown,
  ...inputProps
}: MoneyInputProps) => {
  const [displayValue, setDisplayValue] = useState(() => formatMoneyAmount(value ?? 0));
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isAllowedKey(event)) {
      event.preventDefault();
      return;
    }
    onKeyDown?.(event);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = digitsToAmount(parseDigits(event.target.value));
    const formattedValue = formatMoneyAmount(amount);
    setDisplayValue(formattedValue);
    event.target.value = formattedValue;
    moveCaretToEnd(event.target);
    notifyValueChange(onValueChange, name, amount, event);
    onChange?.(event);
  };

  useEffect(() => {
    if (value === undefined) return;
    setDisplayValue(formatMoneyAmount(value));
  }, [value]);

  return (
    <input
      name={name}
      value={displayValue}
      {...inputProps}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      type='text'
      inputMode='decimal'
    />
  );
};

function parseDigits(value: string) {
  return value.replace(/\D/g, '');
}

function digitsToAmount(digits: string) {
  return Number(digits || '0') / 100;
}

function formatMoneyAmount(amount: number) {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency: DEFAULT_CURRENCY
  })
    .formatToParts(amount)
    .filter(part => part.type !== 'currency' && part.type !== 'literal')
    .map(part => part.value)
    .join('');
}

function isAllowedKey(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.ctrlKey || event.metaKey) return isAllowedModifierKey(event.key);
  return isValidKey(event.key);
}

function isValidKey(key: string){
  const isDigitKey = /^\d$/.test(key);
  const isEditKey = ['Backspace', 'Delete', 'Tab', 'Escape'].includes(key);
  return isDigitKey || isEditKey;
}

function isAllowedModifierKey(key: string) {
  return ['a', 'c', 'v', 'x'].includes(key.toLowerCase());
}

function moveCaretToEnd(input: HTMLInputElement) {
  const end = input.value.length;
  input.setSelectionRange(end, end);
}

function notifyValueChange(
  onValueChange: MoneyInputProps['onValueChange'],
  name: string,
  amount: number,
  event: React.ChangeEvent<HTMLInputElement>
) {
  if (!onValueChange) return;
  onValueChange({ name, value: amount }, event);
}
