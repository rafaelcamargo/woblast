type IconProps = {
  name: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const Icon = ({ name, children, ...rest }: IconProps) => {
  return (
    <div
      className={`wt-icon wt-icon-${name}`}
      aria-hidden='true'
      {...rest}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
        {children}
      </svg>
    </div>
  );
};
