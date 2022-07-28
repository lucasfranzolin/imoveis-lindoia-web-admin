import { Flex, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const StepHeading = ({
    children,
    icon,
    isCompletedStep,
    isCurrentStep,
    isError,
}) => {
    let red = useColorModeValue('red.500', 'red.300');
    let teal = useColorModeValue('teal.500', 'teal.300');
    let text = useColorModeValue('gray.600', 'gray.400');
    let transparent = useColorModeValue('white', 'gray.800');
    let containerSize = 8;
    let iconSize = 6;

    return (
        <HStack>
            <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                w={containerSize}
                h={containerSize}
                borderRadius="50%"
                bg={isError ? red : isCompletedStep ? teal : transparent}
                borderWidth={isCurrentStep || isCompletedStep ? 1 : 0}
                borderColor={
                    isError
                        ? red
                        : isCurrentStep || isCompletedStep
                        ? teal
                        : undefined
                }
            >
                {isError ? (
                    <Icon
                        as={XIcon}
                        w={iconSize}
                        h={iconSize}
                        textColor={transparent}
                    />
                ) : isCompletedStep ? (
                    <Icon
                        as={CheckIcon}
                        w={iconSize}
                        h={iconSize}
                        textColor={transparent}
                    />
                ) : (
                    <Icon
                        textColor={isCurrentStep ? teal : text}
                        as={icon}
                        w={iconSize}
                        h={iconSize}
                    />
                )}
            </Flex>
            <Text textColor={isCurrentStep || isCompletedStep ? teal : text}>
                {children}
            </Text>
        </HStack>
    );
};

StepHeading.propTypes = {
    children: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    isCompletedStep: PropTypes.bool,
    isCurrentStep: PropTypes.bool,
    isError: PropTypes.bool,
};

StepHeading.defaultProps = {};

export { StepHeading };
