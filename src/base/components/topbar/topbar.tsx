import { useTranslation } from '@compilorama/polang';
import { Link } from 'react-router-dom';
import { IconButton } from '@src/base/components/icon-button/icon-button';
import { LeftArrowIcon } from '@src/base/icons/left-arrow';
import translations from './topbar.t';

type TopbarProps = {
  backLinkHref?: string
  leftSlot?: React.ReactNode
  midSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

export const Topbar = ({ backLinkHref, leftSlot, midSlot, rightSlot }: TopbarProps) => {
  const { t } = useTranslation(translations);

  return (
    <header className='wt-topbar'>
      <div className='wt-topbar-content'>
        <div className='wt-topbar-left-slot'>
          {backLinkHref && (
            <IconButton
              theme='secondary'
              element={Link}
              to={backLinkHref}
              aria-label={t('go_back') as string}
            >
              <LeftArrowIcon />
            </IconButton>
          )}
          {leftSlot}
        </div>
        <div className='wt-topbar-mid-slot'>{midSlot}</div>
        <div className='wt-topbar-right-slot'>{rightSlot}</div>
      </div>
    </header>
  );
};
