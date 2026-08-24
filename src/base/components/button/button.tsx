type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  theme?: 'primary' | 'secondary'
  disabled?: boolean
  onClick?: () => void
}

export const Button = ({
  children,
  theme = 'primary',
  disabled,
  onClick,
  type = 'button'
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`wt-button is-${theme}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
