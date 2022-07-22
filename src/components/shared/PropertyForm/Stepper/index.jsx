import { Divider, HStack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { StepperIcon } from '../StepperIcon';

const Stepper = ({ steps, activeStep }) => {
    let lastIndex = steps.length - 1;

    return (
        <HStack spacing={4} mb={8}>
            {steps.map(({ label, icon }, index) => (
                <>
                    <HStack key={`step-${label}`}>
                        <StepperIcon
                            icon={icon}
                            isCompletedStep={index < activeStep}
                            isCurrentStep={index === activeStep}
                            isError={false}
                        />
                        <Text>{label}</Text>
                    </HStack>
                    {index < lastIndex && (
                        <Divider
                            flex={1}
                            orientation="horizontal"
                            borderWidth={2}
                            borderRadius="3xl"
                            borderColor={
                                index + 1 <= activeStep ? 'teal.500' : undefined
                            }
                        />
                    )}
                </>
            ))}
        </HStack>
    );
};

Stepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
        })
    ).isRequired,
    activeStep: PropTypes.number.isRequired,
};

export { Stepper };
