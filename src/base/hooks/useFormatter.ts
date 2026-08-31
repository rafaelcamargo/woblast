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
  return { formatCurrency, formatMonthYear };
}
