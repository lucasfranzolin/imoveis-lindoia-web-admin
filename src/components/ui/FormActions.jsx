import { Button, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const FormActions = ({ isSubmitting, onCancel, isLoaded }) => {
    const { submitForm } = useFormikContext();

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
                    <Button onClick={onCancel} isDisabled={isSubmitting}>
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
    onCancel: PropTypes.func.isRequired,
};

FormActions.defaultProps = {
    isLoaded: true,
};

export { FormActions };
