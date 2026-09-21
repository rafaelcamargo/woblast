import { Icon } from '@src/base/components/icon/icon';

type BulbIconProps = Omit<React.ComponentProps<typeof Icon>, 'name' | 'children'>

export const BulbIcon = (props: BulbIconProps) => {
  return (
    <Icon {...props} name='bulb'>
      <path data-stroke d='M16.65,24.934C16.65,23.634 15.832,22.85 15.832,22.85C15.832,22.85 12.224,19.913 12.224,15.621C12.224,11.33 15.709,7.846 20,7.846C24.291,7.846 27.776,11.33 27.776,15.621C27.776,19.913 24.168,22.85 24.168,22.85C24.168,22.85 23.35,23.634 23.35,24.934' />
      <path data-stroke d='M15.965,26.648L24.052,26.648' />
      <path data-stroke d='M15.965,28.38L24.052,28.38' />
      <path data-stroke d='M16.899,30.113L23.118,30.113' />
      <path data-stroke d='M18.929,31.846L21.088,31.846' />
    </Icon>
  );
};
