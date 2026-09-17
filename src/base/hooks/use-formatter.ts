import { useTranslation } from '@compilorama/polang';
import dateService from '@src/base/services/date';

type FormatFullMonthYearParams = {
  month: string
  year: string
}

export function useFormatter() {
  const { locale } = useTranslation({});
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat(locale.code, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat(locale.code, { month: 'short' })
      .format(date)
      .replace('.', '')
      .toUpperCase();
    return `${day} ${month} ${date.getFullYear()}`;
  };
  const formatFullMonthYear = ({ month, year }: FormatFullMonthYearParams) => {
    return dateService.formatFullMonthYear({ month, year, locale: locale.code });
  };
  const formatMonth = (date: Date, monthFormat: Intl.DateTimeFormatOptions['month']) => {
    return new Intl.DateTimeFormat(locale.code, { month: monthFormat }).format(date).replace('.', '');
  };
  return { formatFullMonthYear, formatMonth, formatNumber, formatDate };
}
