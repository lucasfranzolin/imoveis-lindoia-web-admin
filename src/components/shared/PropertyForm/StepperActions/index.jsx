import { Button, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const StepperActions = ({ isFirstStep, isLastStep, onPrevious }) => {
    const { submitForm } = useFormikContext();

    return (
        <HStack spacing={4} alignSelf="end">
            <Button onClick={onPrevious}>
                {isFirstStep ? 'Cancelar' : 'Anterior'}
            </Button>
            <Button colorScheme="teal" onClick={submitForm}>
                {isLastStep ? 'Finalizar' : 'Próximo'}
            </Button>
        </HStack>
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
