type TopbarProps = {
  leftSlot: React.ReactNode
  rightSlot: React.ReactNode
}

export const Topbar = ({ leftSlot, rightSlot }: TopbarProps) => {
  return (
    <header className='wt-topbar'>
      <div className='wt-topbar-content'>
        <div className='wt-topbar-left-slot'>{leftSlot}</div>
        <div className='wt-topbar-right-slot'>{rightSlot}</div>
      </div>
    </header>
  );
};
