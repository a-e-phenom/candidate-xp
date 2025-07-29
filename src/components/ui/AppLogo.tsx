import React from 'react';
import logo from '../../assets/logo.svg';

export const AppLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img src={logo} alt="Wizard Flow" className="h-10" />
    </div>
  );
};