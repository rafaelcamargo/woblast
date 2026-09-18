import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import { useFormatter } from '@src/base/hooks/use-formatter';
import type { SimulationMonth } from '@src/plans/services/retirement';
import { IconButton } from '@src/base/components/icon-button/icon-button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@src/base/components/table/table';
import { ArrowIcon } from '@src/base/icons/arrow';
import { LeftArrowIcon } from '@src/base/icons/left-arrow';
import translations from './retirement-plan-list.t';

type RetirementPlanListProps = {
  months: SimulationMonth[]
}

const RetirementPlanList = ({ months }: RetirementPlanListProps) => {
  const { t } = useTranslation(translations);
  const { formatMonth, formatNumber } = useFormatter();
  const years = buildYears(months);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const selectedYearIndex = years.indexOf(selectedYear);

  const handlePreviousYear = () => setSelectedYear(years[selectedYearIndex - 1]);
  const handleNextYear = () => setSelectedYear(years[selectedYearIndex + 1]);

  return (
    <div className='wt-retirement-plan-list'>
      <div className='wt-retirement-plan-list-header'>
        <IconButton
          theme='secondary'
          disabled={selectedYearIndex === 0}
          onClick={handlePreviousYear}
          aria-label={t('previous_year') as string}
        >
          <LeftArrowIcon />
        </IconButton>
        <strong>
          {selectedYear}
        </strong>
        <IconButton
          theme='secondary'
          disabled={selectedYearIndex === years.length - 1}
          onClick={handleNextYear}
          aria-label={t('next_year') as string}
        >
          <ArrowIcon />
        </IconButton>
      </div>
      <Table
        className='wt-retirement-plan-list-table'
        caption={t('table_caption', { year: selectedYear })}
      >
        <thead>
          <TableRow>
            <TableHead>{t('month')}</TableHead>
            <TableHead>{t('deposit')}</TableHead>
            <TableHead>{t('balance')}</TableHead>
            <TableHead>{t('interests')}</TableHead>
          </TableRow>
        </thead>
        <TableBody>
          {filterMonthsByYear(months, selectedYear).map(month => (
            <TableRow key={month.id}>
              <TableCell>{formatMonth(month.date, 'short')}</TableCell>
              <TableCell>{formatNumber(month.deposit)}</TableCell>
              <TableCell>{formatNumber(month.balance)}</TableCell>
              <TableCell>{formatNumber(month.interests)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function buildYears(months: SimulationMonth[]) {
  return months.reduce((years: number[], month) => {
    const year = month.date.getFullYear();
    return years.includes(year) ? years : [...years, year];
  }, []);
}

function filterMonthsByYear(months: SimulationMonth[], year: number) {
  return months.filter(month => month.date.getFullYear() === year);
}

export default RetirementPlanList;
