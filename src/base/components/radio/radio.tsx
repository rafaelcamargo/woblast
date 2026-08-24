import { useId } from 'react';

type RadioProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'children'> & {
  label: React.ReactNode
  description: React.ReactNode
  children?: React.ReactNode
}

export const Radio = ({
  id,
  label,
  description,
  children,
  ...inputProps
}: RadioProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className='wt-radio'>
      <input
        id={inputId}
        type='radio'
        {...inputProps}
      />
      <span className='wt-radio-copy'>
        <label htmlFor={inputId}>{label}</label>
        <p>{description}</p>
        {children}
      </span>
    </div>
  );
};
