import { Divider, HStack, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

import { StepHeading } from '../StepHeading';

const Stepper = ({ steps, activeStep }) => {
    let lastIndex = steps.length - 1;
    let teal = useColorModeValue('teal.500', 'teal.300');
    let gray = useColorModeValue('gray.400', 'gray.600');

    return (
        <HStack spacing={4} mb={8}>
            {steps.map(({ label, icon }, index) => {
                const isCompletedStep = index < activeStep;
                const isCurrentStep = index === activeStep;
                const showDivier = index < lastIndex;
                return (
                    <Fragment key={`step-${label}`}>
                        <StepHeading
                            icon={icon}
                            isCompletedStep={isCompletedStep}
                            isCurrentStep={isCurrentStep}
                            isError={false}
                        >
                            {label}
                        </StepHeading>
                        {showDivier && (
                            <Divider
                                flex={1}
                                orientation="horizontal"
                                borderWidth={1}
                                borderRadius="3xl"
                                borderColor={
                                    index + 1 <= activeStep ? teal : gray
                                }
                            />
                        )}
                    </Fragment>
                );
            })}
        </HStack>
    );
};

Stepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.object.isRequired,
        })
    ).isRequired,
    activeStep: PropTypes.number.isRequired,
};

export { Stepper };
