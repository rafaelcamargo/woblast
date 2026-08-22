import { useTranslation } from '@compilorama/polang';
import translations from './plans-blankslate.t';

export const PlansBlankslate = () => {
  const { t } = useTranslation(translations);
  return (
    <div className='wt-plans-blankslate'>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
    </div>
  );
};
