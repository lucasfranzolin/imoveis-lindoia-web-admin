import { Box, HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Stepper = ({ steps, activeStep }) => {
    return (
        <HStack spacing={4} justifyContent="space-between" mb={8}>
            {steps.map((step, index) => (
                <Box
                    key={step}
                    bg={activeStep === index ? 'teal.300' : undefined}
                >
                    {step}
                </Box>
            ))}
        </HStack>
    );
};

Stepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeStep: PropTypes.number.isRequired,
};

export { Stepper };
