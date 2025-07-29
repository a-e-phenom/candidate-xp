import React, { ReactNode } from 'react';
import WizardHeader from './WizardHeader';
import WizardFooter from './WizardFooter';
import QuestionStepper from './QuestionStepper';
import { AppLogo } from '../ui/AppLogo';
import { X } from 'lucide-react';

interface FooterButtons {
  primary: string;
  secondary: string;
}

interface WizardLayoutProps {
  children: ReactNode;
  currentStep: number;
  currentSubStep: number;
  totalSteps: number;
  stepProgress: Record<number, number>;
  totalDotsPerStep: Record<number, number>;
  stepLabels: Record<number, string>;
  subStepLabel: string;
  footerButtons: FooterButtons;
  onNext: () => void;
  onBack: () => void;
  onRecordVideo: () => void;
  autoAdvance: boolean;
  onAutoAdvanceChange: (value: boolean) => void;
  showAutoAdvance: boolean;
  isNextDisabled: boolean;
  showBackButton: boolean;
  isVideoFlow: boolean;
  isInterviewScheduling: boolean;
  currentAssessmentQuestion: number;
  currentVideoQuestion: number;
}

const WizardLayout: React.FC<WizardLayoutProps> = ({
  children,
  currentStep,
  currentSubStep,
  totalSteps,
  stepProgress,
  totalDotsPerStep,
  stepLabels,
  subStepLabel,
  footerButtons,
  onNext,
  onBack,
  onRecordVideo,
  autoAdvance,
  onAutoAdvanceChange,
  showAutoAdvance,
  isNextDisabled,
  showBackButton,
  isVideoFlow,
  isInterviewScheduling,
  currentAssessmentQuestion,
  currentVideoQuestion
}) => {
  const isAssessmentStep = currentStep === 3 && subStepLabel.includes('Assessment');
  const isVideoInterviewStep = currentStep === 3 && subStepLabel.includes('Video interview');
  const shouldShowStepper = isAssessmentStep || isVideoInterviewStep;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <header className="bg-white shadow-sm py-6 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <AppLogo />
          <div className="flex-grow px-8">
            <WizardHeader
              currentStep={currentStep}
              currentSubStep={currentSubStep}
              totalSteps={totalSteps}
              stepProgress={stepProgress}
              totalDotsPerStep={totalDotsPerStep}
              stepLabels={stepLabels}
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-600" />
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8" style={{ paddingBottom: shouldShowStepper ? '160px' : '120px' }}>
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto min-h-[400px]">
          {children}
        </div>
      </main>

      {shouldShowStepper && (
        <div className="fixed bottom-[88px] left-0 right-0 bg-white z-50" style={{ height: '4px' }}>
          <div className="w-full h-full px-6">
            <QuestionStepper 
              currentQuestion={isAssessmentStep ? currentAssessmentQuestion : currentVideoQuestion}
              totalQuestions={isAssessmentStep ? 3 : 2}
            />
          </div>
        </div>
      )}

      <WizardFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        subStepLabel={subStepLabel}
        onNext={onNext}
        onBack={onBack}
        onRecordVideo={onRecordVideo}
        isNextDisabled={isNextDisabled}
        footerButtons={footerButtons}
        autoAdvance={autoAdvance}
        onAutoAdvanceChange={onAutoAdvanceChange}
        showAutoAdvance={showAutoAdvance}
        showBackButton={showBackButton}
        isVideoFlow={isVideoFlow}
        isInterviewScheduling={isInterviewScheduling}
      />
    </div>
  );
};

export default WizardLayout;