import { useTranslation, type UseTranslationResult } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { Button } from '@src/base/components/button/button';
import { CalendarIcon } from '@src/base/icons/calendar';
import { CoinsIcon } from '@src/base/icons/coins';
import { VaultIcon } from '@src/base/icons/vault';
import translations from './home-plan-details.t';

type HomePlanDetailsItem = {
  Icon: React.ComponentType
  title: React.ReactNode
  description: React.ReactNode
};

export const HomePlanDetails = () => {
  const { t } = useTranslation(translations);
  const items = buildItems(t);

  return (
    <section className='wt-home-plan-details'>
      <div className='wt-home-plan-details-content'>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <Button theme='secondary' element={Link} to='/plans/new'>
          {t('plan_now')}
        </Button>
        <ul>
          {items.map(({ Icon, title, description }, index) => (
            <li key={index}>
              <Icon />
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

function buildItems(t: UseTranslationResult['t']) {
  return [
    buildItem(CalendarIcon, t('monthly_evolution_title'), t('monthly_evolution_description')),
    buildItem(VaultIcon, t('projection_title'), t('projection_description')),
    buildItem(CoinsIcon, t('income_title'), t('income_description'))
  ];
}

function buildItem(
  Icon: HomePlanDetailsItem['Icon'],
  title: HomePlanDetailsItem['title'],
  description: HomePlanDetailsItem['description']
): HomePlanDetailsItem {
  return { Icon, title, description };
}
