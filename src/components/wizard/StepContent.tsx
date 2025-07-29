import React from 'react';
import { Button } from '../ui/Button';
import ContactInformationForm from '../forms/ContactInformationForm';

interface StepContentProps {
  step: number;
  subStep: number;
  onIncrement: () => void;
  onCompleteAllSteps?: () => void;
  onFormValidation?: (isValid: boolean) => void;
  assessmentQuestion?: number;
  videoQuestion?: number;
  isVideoFlow?: boolean;
  isInterviewScheduling?: boolean;
}

const StepContent: React.FC<StepContentProps> = ({ 
  step, 
  subStep, 
  onIncrement, 
  onCompleteAllSteps,
  onFormValidation,
  assessmentQuestion = 1,
  videoQuestion = 1,
  isVideoFlow = false,
  isInterviewScheduling = false,
}) => {
  const stepContent = {
    1: {
      1: (
        <ContactInformationForm 
          onFieldChange={onIncrement}
          onCompleteAllSteps={onCompleteAllSteps}
          onFormValidation={onFormValidation}
        />
      ),
      2: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Pre-application Questions</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for pre-application questions.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={onIncrement}>
              Fill a field
            </Button>
            <Button variant="secondary" onClick={onCompleteAllSteps}>
              Complete all steps
            </Button>
          </div>
        </div>
      ),
    },
    2: {
      1: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Application Questions</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for application questions.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={onIncrement}>
              Fill a field
            </Button>
            <Button variant="secondary" onClick={onCompleteAllSteps}>
              Complete all steps
            </Button>
          </div>
        </div>
      ),
      2: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Resume Upload</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for resume upload.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={onIncrement}>
              Fill a field
            </Button>
            <Button variant="secondary" onClick={onCompleteAllSteps}>
              Complete all steps
            </Button>
          </div>
        </div>
      ),
      3: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">My Expertise</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for expertise information.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={onIncrement}>
              Fill a field
            </Button>
            <Button variant="secondary" onClick={onCompleteAllSteps}>
              Complete all steps
            </Button>
          </div>
        </div>
      ),
      4: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Voluntary Disclosure</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for voluntary disclosure.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={onIncrement}>
              Fill a field
            </Button>
            <Button variant="secondary" onClick={onCompleteAllSteps}>
              Complete all steps
            </Button>
          </div>
        </div>
      ),
      5: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Review</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for review.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={onIncrement}>
              Fill a field
            </Button>
            <Button variant="secondary" onClick={onCompleteAllSteps}>
              Complete all steps
            </Button>
          </div>
        </div>
      ),
    },
    3: {
      1: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Assessment Question {assessmentQuestion}</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for assessment question {assessmentQuestion}.</p>
          <div className="flex justify-center">
            <Button variant="secondary" onClick={onIncrement}>
              Fill a field
            </Button>
          </div>
        </div>
      ),
      2: isVideoFlow ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Video Question {videoQuestion}</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for video question {videoQuestion}.</p>
          <div className="flex justify-center">
            <Button variant="secondary" onClick={onIncrement}>
              Record a video
            </Button>
          </div>
        </div>
      ) : isInterviewScheduling ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Interview Scheduling</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for interview scheduling.</p>
          <div className="flex justify-center">
            <Button variant="secondary" onClick={onIncrement}>
              Pick date and time
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Scheduling</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for scheduling.</p>
        </div>
      ),
      3: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Thank you</h2>
          <p className="text-[#637085] mb-8">This is a placeholder for the final thank you message.</p>
        </div>
      ),
    },
  };

  return (
    <div className="py-6">
      {stepContent[step as keyof typeof stepContent][subStep as keyof (typeof stepContent)[typeof step]]}
    </div>
  );
};

export default StepContent;