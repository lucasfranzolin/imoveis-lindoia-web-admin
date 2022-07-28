import { Button, HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BaseButtons = ({ isFirstStep, isLastStep, onNegative, onPositive }) => {
    return (
        <HStack spacing={4} alignSelf="end">
            <Button onClick={onNegative}>
                {isFirstStep ? 'Cancelar' : 'Anterior'}
            </Button>
            <Button colorScheme="teal" onClick={onPositive}>
                {isLastStep ? 'Finalizar' : 'Próximo'}
            </Button>
        </HStack>
    );
};

BaseButtons.propTypes = {
    isFirstStep: PropTypes.bool,
    isLastStep: PropTypes.bool,
    onNegative: PropTypes.func.isRequired,
    onPositive: PropTypes.func.isRequired,
};

BaseButtons.defaultProps = {
    isFirstStep: false,
    isLastStep: false,
};

export { BaseButtons };
