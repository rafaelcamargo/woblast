import '@src/plans/index.styl';
import { useTranslation } from '@compilorama/polang';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import { PlansBlankslate } from '@src/plans/components/plans-blankslate/plans-blankslate';
import translations from './plans-view.t';

const PlansView = () => {
  const { t } = useTranslation(translations);
  return (
    <>
      <Topbar
        leftSlot={<h1>{t('my_plans')}</h1>}
        rightSlot={<Logo />}
      />
      <ViewContainer>
        <PlansBlankslate />
      </ViewContainer>
    </>
  );
};

export default PlansView;
