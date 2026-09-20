import { useTranslation } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { Button } from '@src/base/components/button/button';
import translations from './home-hero.t';

export const HomeHero = () => {
  const { t } = useTranslation(translations);

  return (
    <section className='wt-home-hero'>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <Button theme='primary' element={Link} to='/plans/new'>
        {t('plan_now')}
      </Button>
    </section>
  );
};
