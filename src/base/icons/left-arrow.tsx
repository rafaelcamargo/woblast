import { Icon } from '@src/base/components/icon/icon';

type LeftArrowIconProps = Omit<React.ComponentProps<typeof Icon>, 'name' | 'children'>

export const LeftArrowIcon = (props: LeftArrowIconProps) => {
  return (
    <Icon {...props} name='left-arrow'>
      <path data-stroke d='M15.538,14.462L10,20L15.538,25.538' />
      <path data-stroke d='M28,20L10.02,20' />
    </Icon>
  );
};
