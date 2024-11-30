/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const updateProgress = (step) => {
    setCurrentStep(step);
  };

  return (
    <ProgressContext.Provider value={{ currentStep, updateProgress, steps }}>
      {children}
    </ProgressContext.Provider>
  );
};
