import { useTranslation } from '@compilorama/polang';
import { Button } from '@src/base/components/button/button';
import translations from './wizard-step.t';

export type WizardStepProps = {
  stepName: React.ReactNode
  nextButtonLabel?: React.ReactNode
  nextButtonDisabled?: boolean
  nextButtonElement?: React.ElementType
  nextButtonTo?: string
  onPreviousButtonClick?: () => void
  onNextButtonClick?: () => void
  hasPreviousStep?: boolean
  children: React.ReactNode
}

export const WizardStep = ({
  stepName,
  nextButtonLabel,
  nextButtonDisabled,
  nextButtonElement,
  nextButtonTo,
  onPreviousButtonClick,
  onNextButtonClick,
  hasPreviousStep,
  children
}: WizardStepProps) => {
  return (
    <div className='wt-wizard-step'>
      <h2>{stepName}</h2>
      {children}
      <WizardStepFooter
        nextButtonLabel={nextButtonLabel}
        nextButtonDisabled={nextButtonDisabled}
        nextButtonElement={nextButtonElement}
        nextButtonTo={nextButtonTo}
        onPreviousButtonClick={onPreviousButtonClick}
        onNextButtonClick={onNextButtonClick}
        hasPreviousStep={hasPreviousStep}
      />
    </div>
  );
};

type WizardStepFooterProps = {
  nextButtonLabel?: React.ReactNode
  nextButtonDisabled?: boolean
  nextButtonElement?: React.ElementType
  nextButtonTo?: string
  onPreviousButtonClick?: () => void
  onNextButtonClick?: () => void
  hasPreviousStep?: boolean
}

const WizardStepFooter = ({
  nextButtonLabel,
  nextButtonDisabled,
  nextButtonElement,
  nextButtonTo,
  onPreviousButtonClick,
  onNextButtonClick,
  hasPreviousStep
}: WizardStepFooterProps) => {
  const { t } = useTranslation(translations);

  return (
    <div className='wt-wizard-step-footer'>
      {hasPreviousStep && (
        <Button
          theme='secondary'
          onClick={onPreviousButtonClick}
        >
          {t('previous')}
        </Button>
      )}
      <Button
        element={nextButtonElement}
        to={nextButtonTo}
        onClick={onNextButtonClick}
        disabled={nextButtonDisabled}
      >
        {nextButtonLabel || t('next')}
      </Button>
    </div>
  );
};
