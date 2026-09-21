import { useTranslation } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { Button } from '@src/base/components/button/button';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import { PlansList } from '@src/plans/components/plans-list/plans-list';
import translations from './plans-view.t';

const PlansView = () => {
  const { t } = useTranslation(translations);

  return (
    <>
      <Topbar leftSlot={<h1>{t('my_plans')}</h1>} rightSlot={<Logo wordmark />}/>
      <ViewContainer>
        <div className='wt-plans-view'>
          <PlansList />
          <footer className='wt-plans-view-footer'>
            <Button theme='primary' element={Link} to='/plans/new'>
              {t('create_plan')}
            </Button>
          </footer>
        </div>
      </ViewContainer>
    </>
  );
};

export default PlansView;
