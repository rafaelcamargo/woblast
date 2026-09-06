import { Button } from '@src/base/components/button/button';

type IconButtonProps = Omit<React.ComponentProps<typeof Button>, 'className'> & {
  className?: string
}

export const IconButton = ({ className, ...rest }: IconButtonProps) => {
  return (
    <Button
      className={buildClassName(className)}
      {...rest}
    />
  );
};

function buildClassName(className?: string) {
  return ['wt-icon-button', className].filter(Boolean).join(' ');
}
