import { Icon } from '@src/base/components/icon/icon';

type ArrowIconProps = Omit<React.ComponentProps<typeof Icon>, 'name' | 'children'>

export const ArrowIcon = (props: ArrowIconProps) => {
  return (
    <Icon {...props} name='arrow'>
      <path data-stroke d='M22.462,25.538L28,20L22.462,14.462' />
      <path data-stroke d='M10,20L27.98,20' />
    </Icon>
  );
};
