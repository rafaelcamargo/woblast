import { Icon } from '@src/base/components/icon/icon';

type BinIconProps = Omit<React.ComponentProps<typeof Icon>, 'name' | 'children'>

export const BinIcon = (props: BinIconProps) => {
  return (
    <Icon {...props} name='bin'>
      <path data-stroke d='M28,15.5C28,15.5 27.101,21.795 26.508,25.942C26.217,27.984 24.468,29.5 22.406,29.5L17.594,29.5C15.532,29.5 13.783,27.984 13.492,25.942C12.899,21.795 12,15.5 12,15.5L28,15.5Z' />
      <path data-stroke d='M9,15.5L31,15.5' />
      <path data-stroke d='M15,15.5C15,12.74 17.24,10.5 20,10.5C22.76,10.5 25,12.74 25,15.5' />
      <path data-stroke d='M18,19.5L18,25.5' />
      <path data-stroke d='M22,19.5L22,25.5' />
    </Icon>
  );
};
