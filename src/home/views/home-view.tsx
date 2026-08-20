import { useTranslation } from '@compilorama/polang';
import translations from './home-view.t';

const HomeView = () => {
  const { t } = useTranslation(translations);
  return <h1>{t('homepage')}</h1>;
};

export default HomeView;
