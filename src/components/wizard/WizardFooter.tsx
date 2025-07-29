import React from 'react';
import { Button } from '../ui/Button';

interface FooterButtons {
  primary: string;
  secondary: string;
}

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  subStepLabel: string;
  onNext: () => void;
  onBack: () => void;
  onRecordVideo: () => void;
  isNextDisabled: boolean;
  footerButtons: FooterButtons;
  autoAdvance: boolean;
  onAutoAdvanceChange: (value: boolean) => void;
  showAutoAdvance: boolean;
  showBackButton: boolean;
  isVideoFlow: boolean;
}

const ArrowLeftIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" 
    width={size} 
    height={size}
    fill="#353B46"
  >
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
  </svg>
);

const WizardFooter: React.FC<WizardFooterProps> = ({
  currentStep,
  subStepLabel,
  onNext,
  onBack,
  onRecordVideo,
  isNextDisabled,
  footerButtons,
  autoAdvance,
  onAutoAdvanceChange,
  showAutoAdvance,
  showBackButton,
  isVideoFlow,
}) => {
  const isSchedulingStep = currentStep === 3 && subStepLabel === 'Scheduling';
  const isThankYouStep = currentStep === 3 && subStepLabel === 'Thank you';
  const isInterviewSchedulingStep = currentStep === 3 && subStepLabel === 'Interview Scheduling';

  return (
    <footer className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-3 px-6 fixed bottom-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-[#637085]">
          {subStepLabel}
        </div>
        
        <div className="flex-grow"></div>
        
        <div className="flex items-center gap-4">
          {showAutoAdvance && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#637085]">Auto-Advance</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoAdvance}
                  onChange={(e) => onAutoAdvanceChange(e.target.checked)}
                />
                <div className="w-11 h-6 bg-[#D1D5DC] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4D3EE0]"></div>
              </label>
            </div>
          )}

          {isSchedulingStep ? (
            <>
              <Button 
                variant="secondary"
                onClick={onRecordVideo}
                className="h-12 px-6"
              >
                Record video
              </Button>
              <Button 
                variant="primary" 
                onClick={onNext}
                className="h-6 px-6"
              >
                Schedule interview
              </Button>
            </>
          ) : isInterviewSchedulingStep ? (
            <>
              <Button 
                variant="secondary"
                onClick={onBack}
                className="h-12 px-6"
              >
                No times work
              </Button>
              <Button 
                variant="primary" 
                onClick={onNext}
                disabled={isNextDisabled}
                className="h-12 px-6"
              >
                Schedule
              </Button>
            </>
          ) : showBackButton && (
            <Button 
              variant="secondary" 
              onClick={onBack}
              className="w-12 h-12 p-0 flex items-center justify-center"
            >
              <ArrowLeftIcon size={24} />
            </Button>
          )}
          
          {!isSchedulingStep && !isInterviewSchedulingStep && !isThankYouStep && (
            <Button 
              variant="primary" 
              onClick={onNext}
              disabled={isNextDisabled}
              className="h-12 px-6"
            >
              {footerButtons.primary}
            </Button>
          )}

          {isThankYouStep && (
            <Button 
              variant="primary" 
              onClick={onNext}
              className="h-12 px-6"
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default WizardFooter;