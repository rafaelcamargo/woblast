import { BulbIcon } from '@src/base/icons/bulb';

type TipBoxProps = {
  title: string | React.ReactNode
  description: string | React.ReactNode
}

export const TipBox = ({ title, description }: TipBoxProps) => {
  return (
    <div className='wt-tip-box'>
      <BulbIcon />
      <div className='wt-tip-box-content'>
        <h3>{title}</h3>
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
    </div>
  );
};
