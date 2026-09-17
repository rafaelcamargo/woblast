import { useTranslation } from '@compilorama/polang';
import { useFormatter } from '@src/base/hooks/use-formatter';
import { CalendarIcon } from '@src/base/icons/calendar';
import { CoinsIcon } from '@src/base/icons/coins';
import { VaultIcon } from '@src/base/icons/vault';
import translations from './plan-details-summary.t';

type PlanDetailsSummaryProps = {
  retirementDate: string
  balance: number
  interests: number
}

const PlanDetailsSummary = ({ retirementDate, balance, interests }: PlanDetailsSummaryProps) => {
  const { t } = useTranslation(translations);
  const { formatFullMonthYear, formatNumber } = useFormatter();
  const { month, year } = parseRetirementDate(retirementDate);
  const items = [
    {
      Icon: CalendarIcon,
      label: t('retirement_start'),
      value: formatFullMonthYear({ month, year })
    },
    {
      Icon: VaultIcon,
      label: t('balance'),
      value: formatNumber(balance)
    },
    {
      Icon: CoinsIcon,
      label: t('interests'),
      value: formatNumber(interests)
    }
  ];

  return (
    <header id='planDetailsSummary' className='wt-plan-details-summary'>
      <ul>
        {items.map(({ Icon, label, value }, index) => (
          <li key={index}>
            <Icon />
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </li>
        ))}
      </ul>
    </header>
  );
};

function parseRetirementDate(retirementDate: string) {
  const [month, year] = retirementDate.split('-');
  return { month, year };
}

export default PlanDetailsSummary;
