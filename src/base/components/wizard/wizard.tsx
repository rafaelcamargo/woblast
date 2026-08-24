import { Children, cloneElement, isValidElement } from 'react';
import { useTranslation } from '@compilorama/polang';
import type { WizardStepProps } from '@src/base/components/wizard-step/wizard-step';
import translations from './wizard.t';

type WizardProps = {
  currentStep: number
  children: React.ReactElement<WizardStepProps> | React.ReactElement<WizardStepProps>[]
}

export const Wizard = ({ currentStep, children }: WizardProps) => {
  const { t } = useTranslation(translations);
  const steps = Children.toArray(children);
  const currentChild = steps[currentStep - 1];

  return (
    <div className='wt-wizard'>
      <div className='wt-wizard-header'>
        <div className='wt-wizard-steps'>
          {steps.map((_, index) => (
            <span
              key={index}
              className={buildStepClassName(index, currentStep)}
            />
          ))}
        </div>
        <p>{t('step', { currentStep })}</p>
      </div>
      {isValidElement<WizardStepProps>(currentChild) && cloneElement(currentChild, {
        hasPreviousStep: currentStep > 1
      })}
    </div>
  );
};

function buildStepClassName(stepIndex: number, currentStep: number){
  return stepIndex + 1 === currentStep ? 'wt-wizard-step-dot is-current' : 'wt-wizard-step-dot';
}
