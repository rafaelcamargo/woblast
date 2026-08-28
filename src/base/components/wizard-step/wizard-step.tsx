import { useTranslation } from '@compilorama/polang';
import { Button } from '@src/base/components/button/button';
import translations from './wizard-step.t';

export type WizardStepProps = {
  stepName: React.ReactNode
  nextStepButtonLabel?: string
  nextButtonDisabled?: boolean
  onPreviousButtonClick?: () => void
  onNextButtonClick?: () => void
  hasPreviousStep?: boolean
  children: React.ReactNode
}

export const WizardStep = ({
  stepName,
  nextStepButtonLabel,
  nextButtonDisabled,
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
        nextStepButtonLabel={nextStepButtonLabel}
        nextButtonDisabled={nextButtonDisabled}
        onPreviousButtonClick={onPreviousButtonClick}
        onNextButtonClick={onNextButtonClick}
        hasPreviousStep={hasPreviousStep}
      />
    </div>
  );
};

type WizardStepFooterProps = {
  nextStepButtonLabel?: string
  nextButtonDisabled?: boolean
  onPreviousButtonClick?: () => void
  onNextButtonClick?: () => void
  hasPreviousStep?: boolean
}

const WizardStepFooter = ({
  nextStepButtonLabel,
  nextButtonDisabled,
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
        onClick={onNextButtonClick}
        disabled={nextButtonDisabled}
      >
        {nextStepButtonLabel || t('next')}
      </Button>
    </div>
  );
};
