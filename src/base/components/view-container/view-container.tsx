type ViewContainerProps = {
  children: React.ReactNode
}

export const ViewContainer = ({ children }: ViewContainerProps) => {
  return (
    <div className='wt-view-container'>
      <div className='wt-view-container-content'>
        {children}
      </div>
    </div>
  );  
};
