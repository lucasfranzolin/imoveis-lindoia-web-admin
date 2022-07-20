import { Button, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const StepperActions = ({ isLastStep, onPrevious }) => {
    const { submitForm } = useFormikContext();

    return (
        <HStack spacing={4}>
            <Button onClick={onPrevious}>Voltar</Button>
            <Button colorScheme="teal" onClick={submitForm}>
                {isLastStep ? 'Finalizar' : 'Próximo'}
            </Button>
        </HStack>
    );
};

StepperActions.propTypes = {
    isLastStep: PropTypes.bool.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

StepperActions.defaultProps = {
    isLastStep: false,
};

export { StepperActions };
