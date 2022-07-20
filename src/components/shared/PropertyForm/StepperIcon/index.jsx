import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const StepperIcon = ({}) => {
    return <Box></Box>;
};

StepperIcon.propTypes = {
    index: PropTypes.number.isRequired,
    isCompletedStep: PropTypes.bool,
    isCurrentStep: PropTypes.bool,
    isError: PropTypes.bool,
};

StepperIcon.defaultProps = {};

export { StepperIcon };
