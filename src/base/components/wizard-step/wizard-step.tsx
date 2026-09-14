import { useTranslation } from '@compilorama/polang';
import { Button } from '@src/base/components/button/button';
import translations from './wizard-step.t';

export type WizardStepProps = {
  stepName: React.ReactNode
  nextButtonLabel?: React.ReactNode
  nextButtonDisabled?: boolean
  nextButtonFormId?: string
  onPreviousButtonClick?: () => void
  hasPreviousStep?: boolean
  children: React.ReactNode
}

export const WizardStep = ({
  stepName,
  nextButtonLabel,
  nextButtonDisabled,
  nextButtonFormId,
  onPreviousButtonClick,
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
        nextButtonFormId={nextButtonFormId}
        onPreviousButtonClick={onPreviousButtonClick}
        hasPreviousStep={hasPreviousStep}
      />
    </div>
  );
};

type WizardStepFooterProps = {
  nextButtonLabel?: React.ReactNode
  nextButtonDisabled?: boolean
  nextButtonFormId?: string
  onPreviousButtonClick?: () => void
  hasPreviousStep?: boolean
}

const WizardStepFooter = ({
  nextButtonLabel,
  nextButtonDisabled,
  nextButtonFormId,
  onPreviousButtonClick,
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
        type='submit'
        theme='primary'
        form={nextButtonFormId}
        disabled={nextButtonDisabled}
      >
        {nextButtonLabel || t('next')}
      </Button>
    </div>
  );
};
