import { useFormatter } from '@src/base/hooks/use-formatter';
import { Card } from '@src/base/components/card/card';
import { PlanIcon } from '@src/base/icons/plan';
import { PlansBlankslate } from '@src/plans/components/plans-blankslate/plans-blankslate';
import plansResource from '@src/plans/resources/plans';

export const PlansList = () => {
  const { formatDate } = useFormatter();
  const plans = plansResource.get();

  if (!plans.length) {
    return <PlansBlankslate />;
  }

  return (
    <ul className='wt-plans-list'>
      {plans.map(plan => (
        <li key={plan.id}>
          <Card>
            <div className='wt-plans-list-item'>
              <PlanIcon />
              <div>
                <strong>{plan.name}</strong>
                {plan.created_at && <span>{formatDate(plan.created_at)}</span>}
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};
