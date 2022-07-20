import { useState } from 'react';

export const useSteps = (initialStep) => {
    const [activeStep, setActiveStep] = useState(initialStep);

    const nextStep = () => setActiveStep((prev) => prev + 1);

    const prevStep = () => setActiveStep((prev) => prev - 1);

    const reset = () => setActiveStep(initialStep);

    return {
        activeStep,
        nextStep,
        prevStep,
        reset,
        setStep: setActiveStep,
    };
};
