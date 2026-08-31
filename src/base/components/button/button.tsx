type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  theme?: 'primary' | 'secondary'
  disabled?: boolean
  element?: React.ElementType
  to?: string
  onClick?: () => void
}

export const Button = ({
  children,
  theme,
  disabled,
  onClick,
  type,
  element,
  to
}: ButtonProps) => {
  const Element = element || 'button';

  return (
    <Element
      type={buildNativeType(Element, type)}
      to={to}
      className={buildClassName(theme)}
      onClick={buildClickHandler(disabled, onClick)}
      disabled={buildNativeDisabled(Element, disabled)}
      aria-disabled={buildAriaDisabled(Element, disabled)}
    >
      {children}
    </Element>
  );
};

function buildClassName(theme?: ButtonProps['theme']) {
  return `wt-button is-${theme || 'primary'}`;
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
