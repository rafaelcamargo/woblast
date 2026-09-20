import { useTranslation } from '@compilorama/polang';
import translations from './home-footer.t';

export const HomeFooter = () => {
  const { t } = useTranslation(translations);

  return (
    <footer className='wt-home-footer'>
      <p>{t('credits')}</p>
    </footer>
  );
};
