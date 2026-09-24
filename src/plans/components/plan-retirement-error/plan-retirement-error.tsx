import { useTranslation } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { Button } from '@src/base/components/button/button';
import translations from './plan-retirement-error.t';

export type PlanRetirementErrorStatus = 'unreachable' | 'unknown_error';

type PlanRetirementErrorProps = {
  status: PlanRetirementErrorStatus
};

export const PlanRetirementError = ({ status }: PlanRetirementErrorProps) => {
  const { t } = useTranslation(translations);

  return (
    <div className='wt-plan-retirement-error'>
      <h2>{t(`${status}_heading`)}</h2>
      <p>{t(`${status}_description`)}</p>
      <Button theme='primary' element={Link} to='/plans/new'>
        {t('try_again')}
      </Button>
    </div>
  );
};
