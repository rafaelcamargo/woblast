import { createPortal } from 'react-dom';
import { CloseButton } from '@src/base/components/close-button/close-button';

type DialogProps = {
  open?: boolean
  title: React.ReactNode
  children: React.ReactNode
  onClose: () => void
}

export const Dialog = ({ open, title, children, onClose }: DialogProps) => {
  return createPortal(
    <>
      <div
        className={buildVisibilityDrivenClassName('wt-dialog-overlay', open)}
        onClick={onClose}
        aria-hidden='true'
      />
      <div className={buildVisibilityDrivenClassName('wt-dialog-wrapper', open)}>
        <dialog open={open} aria-hidden={!open} aria-modal='true'>
          <header>
            <h2>{title}</h2>
            <CloseButton onClick={onClose} />
          </header>
          {children}
        </dialog>
      </div>
    </>,
    document.body
  );
};

function buildVisibilityDrivenClassName(baseClassName: string, open?: boolean){
  return [baseClassName, open && 'is-open'].filter(Boolean).join(' ');
}
