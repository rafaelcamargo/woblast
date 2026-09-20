import { useTranslation } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { Button } from '@src/base/components/button/button';
import { Logo } from '@src/base/components/logo/logo';
import translations from './home-island.t';

export const HomeIsland = () => {
  const { t } = useTranslation(translations);

  return (
    <header className='wt-home-island'>
      <Logo wordmark />
      <Button theme='primary' size="sm" element={Link} to='/plans'>
        {t('sign_in')}
      </Button>
    </header>
  );
};
