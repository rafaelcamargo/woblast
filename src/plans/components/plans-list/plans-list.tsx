import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { useFormatter } from '@src/base/hooks/use-formatter';
import { Card } from '@src/base/components/card/card';
import { IconButton } from '@src/base/components/icon-button/icon-button';
import { ArrowIcon } from '@src/base/icons/arrow';
import { BinIcon } from '@src/base/icons/bin';
import { PlanIcon } from '@src/base/icons/plan';
import PlanDeleteDialog from '@src/plans/components/plan-delete-dialog/plan-delete-dialog';
import { PlansBlankslate } from '@src/plans/components/plans-blankslate/plans-blankslate';
import { usePlans } from '@src/plans/hooks/use-plans';
import type { PlanParams } from '@src/plans/types/plan-params';
import translations from './plans-list.t';

type PlanDeleteDialogState = {
  open?: boolean
  planParams?: PlanParams
}

export const PlansList = () => {
  const { t } = useTranslation(translations);
  const { formatDate } = useFormatter();
  const { get, remove } = usePlans();
  const plans = get();
  const [planDeleteDialogProps, setPlanDeleteDialogProps] = useState<PlanDeleteDialogState>({});
  const openPlanDeleteDialog = (planParams: PlanParams) => {
    setPlanDeleteDialogProps({ open: true, planParams });
  };
  const closePlanDeleteDialog = () => {
    setPlanDeleteDialogProps(prevState => ({ ...prevState, open: false }));
  };
  const deletePlan = (id: string) => remove(id);

  if (!plans.length) {
    return <PlansBlankslate />;
  }

  return (
    <>
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
                <div className='wt-plans-list-item-actions'>
                  <IconButton
                    theme='secondary'
                    size='sm'
                    element={Link}
                    to={`/plans/${plan.id}`}
                    aria-label={t('view') as string}
                  >
                    <ArrowIcon />
                  </IconButton>
                  <IconButton
                    theme='secondary'
                    size='sm'
                    aria-label={t('delete', { planName: plan.name }) as string}
                    onClick={() => openPlanDeleteDialog(plan)}
                  >
                    <BinIcon />
                  </IconButton>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <PlanDeleteDialog
        {...planDeleteDialogProps}
        onDelete={deletePlan}
        onClose={closePlanDeleteDialog}
      />
    </>
  );
};
