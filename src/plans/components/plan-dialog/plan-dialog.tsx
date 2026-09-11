import { useState } from 'react';
import { useTranslation } from '@compilorama/polang';
import useCustomHistoryModule from '@src/base/hooks/use-custom-history';
import plansResource from '@src/plans/resources/plans';
import retirementService from '@src/plans/services/retirement';
import { Button } from '@src/base/components/button/button';
import { Dialog } from '@src/base/components/dialog/dialog';
import translations from './plan-dialog.t';

type PlanDialogProps = {
  open?: boolean
  onClose: () => void
}

const PlanDialog = ({ open, onClose }: PlanDialogProps) => {
  const { t } = useTranslation(translations);
  const customHistory = useCustomHistoryModule.useCustomHistory();
  const [planName, setPlanName] = useState('');
  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(target.value);
  };
  const savePlan = () => {
    const formData = plansResource.getTemporaryParams();
    plansResource.save({
      name: planName.trim(),
      type: 'retirement',
      ...retirementService.convertToRetirementPlanParams(formData!)
    });
    plansResource.clearTemporaryRetirementPlanParams();
    customHistory.push('/plans');
  };

  return (
    <Dialog
      open={open}
      title={t('save_plan')}
      onClose={onClose}
    >
      <div className='wt-plan-dialog'>
        <input
          type='text'
          value={planName}
          aria-label={t('plan_name') as string}
          placeholder={t('plan_name') as string}
          onChange={handleNameChange}
        />
        <div className='wt-plan-dialog-actions'>
          <Button
            theme='primary'
            onClick={savePlan}
            disabled={!planName.trim()}
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default PlanDialog;
