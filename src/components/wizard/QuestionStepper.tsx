import React from 'react';
import { motion } from 'framer-motion';

interface QuestionStepperProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuestionStepper: React.FC<QuestionStepperProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex items-center w-full">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentQuestion;
          
          return (
            <React.Fragment key={stepNumber}>
              <motion.div
                className={`h-1 rounded-[12px] transition-all duration-300 ${
                  isActive ? 'bg-[#4D3EE0]' : 'bg-[#D1D5DC]'
                }`}
                style={{
                  flex: 1,
                }}
                initial={{ backgroundColor: '#D1D5DC' }}
                animate={{ 
                  backgroundColor: isActive ? '#4D3EE0' : '#D1D5DC'
                }}
                transition={{ duration: 0.3 }}
              />
              {stepNumber < totalQuestions && (
                <div className="w-2" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionStepper;