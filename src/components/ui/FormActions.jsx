import { Button, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const FormActions = ({ isSubmitting, onCancel, isLoaded }) => {
    const { submitForm } = useFormikContext();

    const handleCancel = () => {
        if (typeof onCancel === 'function') onCancel();
    };

    return (
        <VStack alignItems="flex-start" spacing={4}>
            <HStack>
                <Skeleton isLoaded={isLoaded}>
                    <Button
                        colorScheme="teal"
                        onClick={submitForm}
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting}
                        loadingText="Salvando..."
                    >
                        Salvar
                    </Button>
                </Skeleton>
                <Skeleton isLoaded={isLoaded}>
                    <Button onClick={handleCancel} isDisabled={isSubmitting}>
                        Cancelar
                    </Button>
                </Skeleton>
            </HStack>
        </VStack>
    );
};

FormActions.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
};

FormActions.defaultProps = {
    isLoaded: true,
};

export { FormActions };
