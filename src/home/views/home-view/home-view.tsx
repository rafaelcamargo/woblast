import '@src/home/index.styl';
import { useTranslation, type UseTranslationResult } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { Button } from '@src/base/components/button/button';
import { PlanIcon } from '@src/base/icons/plan';
import beachImage from '@src/base/images/beach.webp';
import calculatorImage from '@src/base/images/calculator.webp';
import skyImage from '@src/base/images/sky.webp';
import { HomeFooter } from '@src/home/components/home-footer/home-footer';
import { HomeHero } from '@src/home/components/home-hero/home-hero';
import { HomeIsland } from '@src/home/components/home-island/home-island';
import { HomePlanDetails } from '@src/home/components/home-plan-details/home-plan-details';
import translations from './home-view.t';

type HomeViewHighlight = {
  className: string
  image: string
  alt: string
  title: React.ReactNode
  description: React.ReactNode
};

const HomeView = () => {
  const { t } = useTranslation(translations);
  const highlights = buildHighlights(t);

  return (
    <div className='wt-home-view'>
      <img src={skyImage} alt={t('sky_image_alt') as string} />
      <HomeIsland />
      <HomeHero />
      {highlights.map(({ className, image, alt, title, description }, index) => (
        <section className={className} key={index}>
          <div className='wt-home-view-highlight-content'>
            <h2>{title}</h2>
            <p>{description}</p>
            <Button theme='secondary' element={Link} to='/plans/new'>
              {t('plan_now')}
            </Button>
          </div>
          <img src={image} alt={alt} />
        </section>
      ))}
      <HomePlanDetails />
      <section className='wt-home-view-cta'>
        <PlanIcon />
        <h2>{t('cta_title')}</h2>
        <p>{t('cta_description')}</p>
        <Button theme='primary' element={Link} to='/plans/new'>
          {t('plan_now')}
        </Button>
      </section>
      <HomeFooter />
    </div>
  );
};

function buildHighlights(t: UseTranslationResult['t']): HomeViewHighlight[] {
  return [
    {
      className: 'wt-home-view-highlight',
      image: beachImage,
      alt: t('beach_image_alt') as string,
      title: t('first_step_title'),
      description: t('first_step_description')
    },
    {
      className: 'wt-home-view-highlight is-reversed',
      image: calculatorImage,
      alt: t('calculator_image_alt') as string,
      title: t('concrete_plan_title'),
      description: t('concrete_plan_description')
    }
  ];
}

export default HomeView;
