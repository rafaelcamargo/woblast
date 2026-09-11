import { Icon } from '@src/base/components/icon/icon';

type CloseIconProps = Omit<React.ComponentProps<typeof Icon>, 'name' | 'children'>

export const CloseIcon = (props: CloseIconProps) => {
  return (
    <Icon {...props} name='close'>
      <path data-stroke d='M12,28L28,12' />
      <path data-stroke d='M28,28L12,12' />
    </Icon>
  );
};
