import { useTranslation } from '@compilorama/polang';
import { Button } from '@src/base/components/button/button';
import { Dialog } from '@src/base/components/dialog/dialog';
import type { PlanParams } from '@src/plans/types/plan-params';
import translations from './plan-delete-dialog.t';

type PlanDeleteDialogProps = {
  planParams?: PlanParams
  open?: boolean
  onDelete: (id: string) => void
  onClose: () => void
}

const PlanDeleteDialog = ({ planParams, open, onDelete, onClose }: PlanDeleteDialogProps) => {
  const { t } = useTranslation(translations);
  const confirmDeletion = () => {
    onDelete(planParams!.id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      title={t('title')}
      onClose={onClose}
    >
      {open && planParams && (
        <div className='wt-plan-delete-dialog'>
          <p>{t('confirmation_message', { planName: planParams.name })}</p>
          <div className='wt-plan-delete-dialog-actions'>
            <Button theme='primary' onClick={confirmDeletion}>
              {t('delete')}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default PlanDeleteDialog;
