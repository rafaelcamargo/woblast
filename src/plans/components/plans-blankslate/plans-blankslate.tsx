import { useTranslation } from '@compilorama/polang';
import deskImage from '@src/base/images/desk.webp';
import translations from './plans-blankslate.t';

export const PlansBlankslate = () => {
  const { t } = useTranslation(translations);
  return (
    <div className='wt-plans-blankslate'>
      <img src={deskImage} alt='' />
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
    </div>
  );
};
