import { useTranslation } from '@compilorama/polang';
import { IconButton } from '@src/base/components/icon-button/icon-button';
import { CloseIcon } from '@src/base/icons/close';
import translations from './close-button.t';

type CloseButtonProps = Omit<React.ComponentProps<typeof IconButton>, 'children' | 'aria-label'>

export const CloseButton = (props: CloseButtonProps) => {
  const { t } = useTranslation(translations);

  return (
    <div className='wt-close-button'>
      <IconButton
        aria-label={t('close') as string}
        {...props}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};
