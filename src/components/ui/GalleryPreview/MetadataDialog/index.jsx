import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import { FormActions } from '../../FormActions';
import { validationSchema } from './utils';

const MetadataDialog = ({
    src,
    index,
    initialValues,
    isOpen,
    onClose,
    onCancel,
    onSubmit,
}) => {
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar metadados</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack direction="row">
                        <Text fontWeight="bold">Ordem de exibição: </Text>
                        <Text>{index + 1}º</Text>
                    </Stack>
                    <Box w="full" my={6}>
                        <Image alt="Imagem de referência" src={src} />
                    </Box>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {(formik) => (
                            <Stack as={Form} spacing={6} pb={4}>
                                <FormControl
                                    isInvalid={
                                        formik.errors.description &&
                                        formik.touched.description
                                    }
                                >
                                    <FormLabel htmlFor="description">
                                        Descrição
                                    </FormLabel>
                                    <Textarea
                                        placeholder="Insira uma breve descrição sobre a imagem."
                                        name="description"
                                        id="description"
                                        rows={6}
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>
                                        {formik.errors.description}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormActions
                                    isSubmitting={false}
                                    isLoaded={true}
                                    onCancel={onCancel}
                                />
                            </Stack>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

MetadataDialog.propTypes = {
    initialValues: PropTypes.shape({
        description: PropTypes.string,
    }),
    index: PropTypes.number,
    src: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export { MetadataDialog };
