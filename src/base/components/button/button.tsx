type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  theme?: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
  element?: React.ElementType
  to?: string
  onClick?: () => void
  'aria-label'?: string
}

export const Button = ({
  children,
  theme,
  className,
  disabled,
  onClick,
  type,
  element,
  to,
  'aria-label': ariaLabel
}: ButtonProps) => {
  const Element = element || 'button';

  return (
    <Element
      type={buildNativeType(Element, type)}
      to={to}
      className={buildClassName(theme, className)}
      onClick={buildClickHandler(disabled, onClick)}
      disabled={buildNativeDisabled(Element, disabled)}
      aria-disabled={buildAriaDisabled(Element, disabled)}
      aria-label={ariaLabel}
    >
      {children}
    </Element>
  );
};

function buildClassName(theme?: ButtonProps['theme'], className?: string) {
  return [
    'wt-button',
    getThemeClassName(theme),
    className
  ].join(' ').replace(/\s+/g, ' ').trim();
}

function getThemeClassName(theme?: ButtonProps['theme']) {
  return {
    primary: 'is-primary',
    secondary: 'is-secondary'
  }[theme as string];
}

function buildClickHandler(disabled?: boolean, onClick?: () => void) {
  return (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.();
  };
}

function buildNativeType(element: React.ElementType, type?: ButtonProps['type']) {
  return element === 'button' ? type || 'button' : undefined;
}

function buildNativeDisabled(element: React.ElementType, disabled?: boolean) {
  return element === 'button' ? disabled : undefined;
}

function buildAriaDisabled(element: React.ElementType, disabled?: boolean) {
  return element === 'button' ? undefined : disabled;
}
