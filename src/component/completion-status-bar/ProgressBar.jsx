/* eslint-disable react/prop-types */


const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="progress-bar">
      {steps?.map((step, index) => (
        <div
          key={index}
          className={`step ${currentStep >= index ? 'completed' : ''}`}
        >
          <div className="step-icon">
            {currentStep >= index ? '✓' : index + 1}
          </div>
          <div className="step-label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;