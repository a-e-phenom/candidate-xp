import React from 'react';
import { Check } from 'lucide-react';
import ProgressDots from './ProgressDots';

interface WizardHeaderProps {
  currentStep: number;
  currentSubStep: number;
  totalSteps: number;
  stepProgress: Record<number, number>;
  totalDotsPerStep: Record<number, number>;
  stepLabels: Record<number, string>;
}

const WizardHeader: React.FC<WizardHeaderProps> = ({
  currentStep,
  currentSubStep,
  totalSteps,
  stepProgress,
  totalDotsPerStep,
  stepLabels,
}) => {
  const renderStepNumber = (step: number) => {
    if (step < currentStep) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4D3EE0] text-white">
          <Check size={16} />
        </div>
      );
    }
    
    return (
      <div 
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step === currentStep 
            ? 'bg-[#4D3EE0] text-white' 
            : 'border-2 border-[#D1D5DC] text-[#353B46] bg-white'
        }`}
      >
        {step}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center w-full max-w-5xl mx-auto">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCurrentStep = step === currentStep;
        
        return (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div className="flex items-center">
                {renderStepNumber(step)}
                <span 
                  className={`ml-3 text-sm font-medium ${
                    isCurrentStep ? 'text-[#353B46]' : 'text-[#637085]'
                  }`}
                >
                  {stepLabels[step]}
                </span>
              </div>
              {isCurrentStep && (
                <div className="ml-3">
                  <ProgressDots 
                    totalDots={totalDotsPerStep[step]}
                    activeDots={stepProgress[step]}
                    isCurrentStep={true}
                    isPreviousStep={false}
                  />
                </div>
              )}
            </div>
            
            {step < totalSteps && (
              <div className="mx-6 h-[2px] w-24 bg-[#D1D5DC]" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WizardHeader;