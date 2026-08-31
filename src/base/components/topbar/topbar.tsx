type TopbarProps = {
  leftSlot?: React.ReactNode
  midSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

export const Topbar = ({ leftSlot, midSlot, rightSlot }: TopbarProps) => {
  return (
    <header className='wt-topbar'>
      <div className='wt-topbar-content'>
        <div className='wt-topbar-left-slot'>{leftSlot}</div>
        <div className='wt-topbar-mid-slot'>{midSlot}</div>
        <div className='wt-topbar-right-slot'>{rightSlot}</div>
      </div>
    </header>
  );
};
