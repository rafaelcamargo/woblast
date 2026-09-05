import { useTranslation } from '@compilorama/polang';

type FormatMonthYearParams = {
  month: string
  monthFormat: Intl.DateTimeFormatOptions['month']
  year: string
  yearFormat: Intl.DateTimeFormatOptions['year']
}

export function useFormatter() {
  const { locale } = useTranslation({});
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale.code, {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  const formatMonthYear = ({ month, monthFormat, year, yearFormat }: FormatMonthYearParams) => {
    return new Intl.DateTimeFormat(locale.code, {
      month: monthFormat,
      year: yearFormat
    }).format(new Date(Number(year), Number(month) - 1));
  };
  const formatMonth = (date: Date, monthFormat: Intl.DateTimeFormatOptions['month']) => {
    return new Intl.DateTimeFormat(locale.code, { month: monthFormat }).format(date).replace('.', '');
  };
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat(locale.code, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  return { formatCurrency, formatMonthYear, formatMonth, formatNumber };
}
