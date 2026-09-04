import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import { useFormatter } from '@src/base/hooks/use-formatter';
import type { SimulationMonth } from '@src/plans/services/retirement';
import { Button } from '@src/base/components/button/button';
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
        <Button
          theme='secondary'
          disabled={selectedYearIndex === 0}
          onClick={handlePreviousYear}
        >
          {t('previous_year')}
        </Button>
        <span>{selectedYear}</span>
        <Button
          theme='secondary'
          disabled={selectedYearIndex === years.length - 1}
          onClick={handleNextYear}
        >
          {t('next_year')}
        </Button>
      </div>
      <div className='wt-retirement-plan-list-table'>
        <table>
          <thead>
            <tr>
              <th>{t('month')}</th>
              <th>{t('deposit')}</th>
              <th>{t('balance')}</th>
              <th>{t('interests')}</th>
            </tr>
          </thead>
          <tbody>
            {filterMonthsByYear(months, selectedYear).map(month => (
              <tr key={month.id}>
                <td>{formatMonth(month.date, 'short')}</td>
                <td>{formatNumber(month.deposit)}</td>
                <td>{formatNumber(month.balance)}</td>
                <td>{formatNumber(month.interests)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
