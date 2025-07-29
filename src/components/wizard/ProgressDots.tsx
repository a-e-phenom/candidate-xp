import React from 'react';
import { motion } from 'framer-motion';

interface ProgressDotsProps {
  totalDots: number;
  activeDots: number;
  isCurrentStep: boolean;
  isPreviousStep: boolean;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ 
  totalDots, 
  activeDots,
  isCurrentStep,
  isPreviousStep
}) => {
  // If this is a previous step, we don't show dots
  if (isPreviousStep) {
    return null;
  }

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalDots }).map((_, index) => {
        const isActive = index <= activeDots;
        
        return (
          <motion.div
            key={index}
            className={`h-2 w-2 rounded-full ${
              isCurrentStep && isActive ? 'bg-[#4D3EE0]' : 'bg-[#D1D5DC]'
            }`}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: isCurrentStep && isActive ? 1 : 0.8,
              backgroundColor: isCurrentStep && isActive ? '#4D3EE0' : '#D1D5DC'
            }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
};

export default ProgressDots;