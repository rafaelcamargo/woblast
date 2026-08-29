import { useEffect, useState } from 'react';
import { useTranslation } from '@compilorama/polang';

export type NumberInputChangeValue = {
  name: string
  value: number
}

type NumberInputProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'type' | 'inputMode' | 'value'
> & {
  name: string
  value?: number
  type?: 'currency' | 'percent'
  onValueChange?: (
    nextValue: NumberInputChangeValue,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}

export const NumberInput = ({
  name,
  value,
  type,
  className,
  onChange,
  onValueChange,
  onKeyDown,
  ...inputProps
}: NumberInputProps) => {
  const { locale } = useTranslation({});
  const [displayValue, setDisplayValue] = useState(() => formatAmount(value ?? 0, locale.code));
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isAllowedKey(event)) {
      event.preventDefault();
      return;
    }
    onKeyDown?.(event);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = digitsToAmount(parseDigits(event.target.value));
    const formattedValue = formatAmount(amount, locale.code);
    setDisplayValue(formattedValue);
    event.target.value = formattedValue;
    moveCaretToEnd(event.target);
    notifyValueChange(onValueChange, name, amount, event);
    onChange?.(event);
  };

  useEffect(() => {
    if (value === undefined) return;
    setDisplayValue(formatAmount(value, locale.code));
  }, [value, locale.code]);

  return (
    <input
      name={name}
      value={displayValue}
      className={buildClassName(type, className)}
      {...inputProps}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      type='text'
      inputMode='decimal'
    />
  );
};

function buildClassName(type: NumberInputProps['type'], className?: string) {
  const classes = ['wt-number-input'];
  if (type) classes.push(buildTypeModifiers()[type]);
  if (className) classes.push(className);
  return classes.join(' ');
}

function buildTypeModifiers() {
  return {
    currency: 'is-currency',
    percent: 'is-percent'
  };
}

function parseDigits(value: string) {
  return value.replace(/\D/g, '');
}

function digitsToAmount(digits: string) {
  return Number(digits || '0') / 100;
}

function formatAmount(amount: number, localeCode: string) {
  return new Intl.NumberFormat(localeCode, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
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
  onValueChange: NumberInputProps['onValueChange'],
  name: string,
  amount: number,
  event: React.ChangeEvent<HTMLInputElement>
) {
  onValueChange?.({ name, value: amount }, event);
}
