import { Flex, Icon } from '@chakra-ui/react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const StepperIcon = ({ icon, isCompletedStep, isCurrentStep, isError }) => {
    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w={10}
            h={10}
            borderRadius="50%"
            bg={isError ? 'red.500' : isCompletedStep ? 'teal.500' : 'white'}
            borderWidth={isCurrentStep || isCompletedStep ? 2 : 0}
            borderColor={
                isError
                    ? 'red.500'
                    : isCurrentStep || isCompletedStep
                    ? 'teal.500'
                    : undefined
            }
        >
            {isError ? (
                <Icon as={XIcon} w={6} h={6} textColor="white" />
            ) : isCompletedStep ? (
                <Icon as={CheckIcon} w={6} h={6} textColor="white" />
            ) : (
                <Icon
                    textColor={isCurrentStep ? 'teal.500' : 'gray.500'}
                    as={icon}
                    w={6}
                    h={6}
                />
            )}
        </Flex>
    );
};

StepperIcon.propTypes = {
    icon: PropTypes.element.isRequired,
    isCompletedStep: PropTypes.bool,
    isCurrentStep: PropTypes.bool,
    isError: PropTypes.bool,
};

StepperIcon.defaultProps = {};

export { StepperIcon };
