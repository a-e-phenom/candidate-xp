import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  const baseClasses = "flex items-center justify-center rounded-md px-4 py-2 font-medium transition-all duration-200";
  
  const variantClasses = {
    primary: `bg-[#4D3EE0] text-white hover:bg-[#3F32B5] ${
      disabled ? 'bg-[#AEB5C2] hover:bg-[#AEB5C2] cursor-not-allowed' : ''
    }`,
    secondary: "bg-white text-[#353B46] border border-[#D1D5DC] hover:bg-gray-50"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};