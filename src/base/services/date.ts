type FormatFullMonthYearParams = {
  month: string
  year: string
  locale: string
}

type DateService = {
  getNow: () => Date
  formatFullMonthYear: (params: FormatFullMonthYearParams) => string
};

const _public = {} as DateService;

_public.getNow = () => new Date();

_public.formatFullMonthYear = ({ month, year, locale }: FormatFullMonthYearParams) => {
  const date = new Date(Number(year), Number(month) - 1);
  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  const yearLabel = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
  return `${monthLabel} ${yearLabel}`;
};

export default _public;
