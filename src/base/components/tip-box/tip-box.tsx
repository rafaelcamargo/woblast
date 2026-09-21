import { BulbIcon } from '@src/base/icons/bulb';

type TipBoxProps = {
  title: string
  description: string
}

export const TipBox = ({ title, description }: TipBoxProps) => {
  return (
    <div className='wt-tip-box'>
      <BulbIcon />
      <div className='wt-tip-box-content'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
