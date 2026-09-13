import { useTranslation } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { useFormatter } from '@src/base/hooks/use-formatter';
import { Card } from '@src/base/components/card/card';
import { IconButton } from '@src/base/components/icon-button/icon-button';
import { ArrowIcon } from '@src/base/icons/arrow';
import { PlanIcon } from '@src/base/icons/plan';
import { PlansBlankslate } from '@src/plans/components/plans-blankslate/plans-blankslate';
import { usePlans } from '@src/plans/hooks/use-plans';
import translations from './plans-list.t';

export const PlansList = () => {
  const { t } = useTranslation(translations);
  const { formatDate } = useFormatter();
  const { get } = usePlans();
  const plans = get();

  if (!plans.length) {
    return <PlansBlankslate />;
  }

  return (
    <ul className='wt-plans-list'>
      {plans.map(plan => (
        <li key={plan.id}>
          <Card>
            <div className='wt-plans-list-item'>
              <div className='wt-plans-list-item-content'>
                <PlanIcon />
                <div>
                  <strong>{plan.name}</strong>
                  {plan.created_at && <span>{formatDate(plan.created_at)}</span>}
                </div>
              </div>
              <IconButton
                theme='secondary'
                size='sm'
                element={Link}
                to={`/plans/${plan.id}`}
                aria-label={t('view') as string}
              >
                <ArrowIcon />
              </IconButton>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};
