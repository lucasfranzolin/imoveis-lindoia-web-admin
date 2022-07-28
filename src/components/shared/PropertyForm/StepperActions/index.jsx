import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import { BaseButtons } from './BaseButtons';

const StepperActions = ({ isFirstStep, isLastStep, onPrevious }) => {
    const { submitForm } = useFormikContext();

    return (
        <BaseButtons
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onNegative={onPrevious}
            onPositive={submitForm}
        />
    );
};

StepperActions.propTypes = {
    isFirstStep: PropTypes.bool,
    isLastStep: PropTypes.bool,
    onPrevious: PropTypes.func.isRequired,
};

StepperActions.defaultProps = {
    isFirstStep: false,
    isLastStep: false,
};

export { StepperActions };
