type CardProps = {
  children: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className='wt-card'>
      {children}
    </div>
  );
};
