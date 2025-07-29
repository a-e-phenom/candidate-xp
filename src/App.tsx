import React, { useState } from 'react';
import WizardLayout from './components/wizard/WizardLayout';
import StepContent from './components/wizard/StepContent';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [currentAssessmentQuestion, setCurrentAssessmentQuestion] = useState(1);
  const [currentVideoQuestion, setCurrentVideoQuestion] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [isVideoFlow, setIsVideoFlow] = useState(false);
  const [isInterviewScheduling, setIsInterviewScheduling] = useState(false);
  const [stepProgress, setStepProgress] = useState({
    1: 0,
    2: 0,
    3: 0,
  });
  const [isFieldFilled, setIsFieldFilled] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const totalDotsPerStep = {
    1: 2,
    2: 5,
    3: 3,
  };

  const stepLabels = {
    1: 'Your Details',
    2: 'Job Fit',
    3: 'Tasks',
  };

  const subStepLabels = {
    1: {
      1: 'Contact Information',
      2: 'Pre-application Questions',
    },
    2: {
      1: 'Application Questions',
      2: 'Resume Upload',
      3: 'My Expertise',
      4: 'Voluntary Disclosure',
      5: 'Review',
    },
    3: {
      1: 'Assessment',
      2: 'Scheduling',
      3: 'Thank you',
    },
  };

  const getSubStepLabel = () => {
    if (currentStep === 3) {
      if (currentSubStep === 1) {
        return `Assessment | Question ${currentAssessmentQuestion} of 3`;
      } else if (currentSubStep === 2) {
        if (isVideoFlow) {
          return `Screening | Video interview | Question ${currentVideoQuestion} of 2`;
        } else if (isInterviewScheduling) {
          return 'Interview Scheduling';
        }
        return 'Scheduling';
      }
    }
    return subStepLabels[currentStep as keyof typeof subStepLabels][currentSubStep as keyof typeof subStepLabels[typeof currentStep]];
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setCurrentSubStep(1);
    setCurrentAssessmentQuestion(1);
    setCurrentVideoQuestion(1);
    setAutoAdvance(false);
    setIsVideoFlow(false);
    setIsInterviewScheduling(false);
    setStepProgress({
      1: 0,
      2: 0,
      3: 0,
    });
    setIsFieldFilled(false);
    setIsFormValid(false);
  };

  const handleCompleteAllSteps = () => {
    if (currentStep < 3) {
      // Complete current step and move to next main step
      setCurrentStep(prev => prev + 1);
      setCurrentSubStep(1);
      setCurrentAssessmentQuestion(1);
      setStepProgress(prev => ({
        ...prev,
        [currentStep]: totalDotsPerStep[currentStep as keyof typeof totalDotsPerStep],
      }));
      setIsFieldFilled(false);
      setIsFormValid(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (currentSubStep === 1) {
        if (currentAssessmentQuestion < 3) {
          setCurrentAssessmentQuestion(prev => prev + 1);
        } else {
          setCurrentSubStep(2);
          setStepProgress(prev => ({
            ...prev,
            [currentStep]: prev[currentStep as keyof typeof prev] + 1,
          }));
        }
      } else if (currentSubStep === 2) {
        if (isVideoFlow) {
          if (currentVideoQuestion < 2) {
            setCurrentVideoQuestion(prev => prev + 1);
          } else {
            setCurrentSubStep(3);
            setStepProgress(prev => ({
              ...prev,
              [currentStep]: totalDotsPerStep[currentStep as keyof typeof totalDotsPerStep],
            }));
          }
        } else if (isInterviewScheduling) {
          setCurrentSubStep(3);
          setStepProgress(prev => ({
            ...prev,
            [currentStep]: totalDotsPerStep[currentStep as keyof typeof totalDotsPerStep],
          }));
        } else {
          setIsInterviewScheduling(true);
        }
      } else if (currentSubStep === 3) {
        resetFlow();
      }
    } else {
      const currentMaxSubSteps = Object.keys(subStepLabels[currentStep as keyof typeof subStepLabels]).length;
      
      if (currentSubStep < currentMaxSubSteps) {
        setCurrentSubStep(prev => prev + 1);
        setStepProgress(prev => ({
          ...prev,
          [currentStep]: prev[currentStep as keyof typeof prev] + 1,
        }));
      } else if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
        setCurrentSubStep(1);
        setCurrentAssessmentQuestion(1);
        setStepProgress(prev => ({
          ...prev,
          [currentStep]: totalDotsPerStep[currentStep as keyof typeof totalDotsPerStep],
        }));
      }
    }
    setIsFieldFilled(false);
    setIsFormValid(false);
  };

  const handleBack = () => {
    if (currentStep === 3) {
      if (currentSubStep === 1) {
        if (currentAssessmentQuestion > 1) {
          setCurrentAssessmentQuestion(prev => prev - 1);
        } else if (currentStep > 1) {
          setCurrentStep(prev => prev - 1);
          const prevStepMaxSubSteps = Object.keys(subStepLabels[currentStep - 1 as keyof typeof subStepLabels]).length;
          setCurrentSubStep(prevStepMaxSubSteps);
          setStepProgress(prev => ({
            ...prev,
            [currentStep - 1]: totalDotsPerStep[currentStep - 1 as keyof typeof totalDotsPerStep],
          }));
        }
      } else if (currentSubStep === 2) {
        if (isVideoFlow) {
          if (currentVideoQuestion > 1) {
            setCurrentVideoQuestion(prev => prev - 1);
          } else {
            setCurrentSubStep(1);
            setCurrentAssessmentQuestion(3);
            setIsVideoFlow(false);
          }
        } else if (isInterviewScheduling) {
          setIsInterviewScheduling(false);
        }
      }
    } else if (currentSubStep > 1) {
      setCurrentSubStep(prev => prev - 1);
      setStepProgress(prev => ({
        ...prev,
        [currentStep]: prev[currentStep as keyof typeof prev] - 1,
      }));
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      const prevStepMaxSubSteps = Object.keys(subStepLabels[currentStep - 1 as keyof typeof subStepLabels]).length;
      setCurrentSubStep(prevStepMaxSubSteps);
      setStepProgress(prev => ({
        ...prev,
        [currentStep - 1]: totalDotsPerStep[currentStep - 1 as keyof typeof totalDotsPerStep],
      }));
    }
  };

  const handleFieldFill = () => {
    setIsFieldFilled(true);
    if (currentStep === 3 && currentSubStep === 1 && autoAdvance) {
      handleNext();
    }
  };

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
    if (isValid) {
      setIsFieldFilled(true);
    }
  };

  const handleRecordVideo = () => {
    setIsVideoFlow(true);
    setCurrentVideoQuestion(1);
  };

  const getFooterButtons = () => {
    if (currentStep === 3) {
      if (currentSubStep === 2) {
        if (isVideoFlow) {
          return {
            secondary: '',
            primary: currentVideoQuestion === 2 ? 'Submit' : 'Next',
          };
        }
        if (isInterviewScheduling) {
          return {
            secondary: 'No times work',
            primary: 'Schedule',
          };
        }
        return {
          secondary: 'Record video',
          primary: 'Schedule interview',
        };
      }
      if (currentSubStep === 3) {
        return {
          secondary: '',
          primary: 'Finish',
        };
      }
    }
    return {
      secondary: '',
      primary: 'Next',
    };
  };

  // Determine if Next button should be disabled
  const getIsNextDisabled = () => {
    // For Contact Information form (step 1, substep 1), check form validation
    if (currentStep === 1 && currentSubStep === 1) {
      return !isFormValid;
    }
    // For other steps, use the existing logic
    return !isFieldFilled;
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      currentSubStep={currentSubStep}
      totalSteps={3}
      stepProgress={stepProgress}
      totalDotsPerStep={totalDotsPerStep}
      stepLabels={stepLabels}
      subStepLabel={getSubStepLabel()}
      footerButtons={getFooterButtons()}
      onNext={handleNext}
      onBack={handleBack}
      onRecordVideo={handleRecordVideo}
      autoAdvance={autoAdvance}
      onAutoAdvanceChange={setAutoAdvance}
      showAutoAdvance={currentStep === 3 && currentSubStep === 1}
      isNextDisabled={getIsNextDisabled()}
      showBackButton={!(currentStep === 3 && ((currentSubStep === 1 && currentAssessmentQuestion === 1) || currentSubStep === 3))}
      isVideoFlow={isVideoFlow}
      isInterviewScheduling={isInterviewScheduling}
      currentAssessmentQuestion={currentAssessmentQuestion}
      currentVideoQuestion={currentVideoQuestion}
    >
      <StepContent 
        step={currentStep}
        subStep={currentSubStep}
        onIncrement={handleFieldFill}
        onCompleteAllSteps={handleCompleteAllSteps}
        onFormValidation={handleFormValidation}
        assessmentQuestion={currentAssessmentQuestion}
        videoQuestion={currentVideoQuestion}
        isVideoFlow={isVideoFlow}
        isInterviewScheduling={isInterviewScheduling}
      />
    </WizardLayout>
  );
}

export default App;