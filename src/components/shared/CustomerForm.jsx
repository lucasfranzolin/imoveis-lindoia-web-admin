import {
    Alert,
    AlertIcon,
    AlertTitle,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Skeleton,
    Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import * as Yup from 'yup';

import { FormActions } from '../ui/FormActions';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Nome é obrigatório.'),
    email: Yup.string()
        .email('Endereço de email inválido.')
        .required('Email é obrigatório.'),
    phone: Yup.string().required('Telefone é obrigatório.'),
});

const CustomerForm = ({ error, data, loading, onSubmit, onCancel, saving }) => {
    const initialValues = useMemo(
        () =>
            data
                ? {
                      email: data.props.email,
                      fullName: data.props.fullName,
                      phone: data.props.phone,
                  }
                : {
                      email: '',
                      fullName: '',
                      phone: '',
                  },
        [data]
    );

    return (
        <>
            {!!error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Erro!</AlertTitle>
                    {error}
                </Alert>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {(formik) => (
                    <Stack as={Form} spacing={4} maxW="md">
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.fullName &&
                                formik.touched.fullName
                            }
                        >
                            <FormLabel htmlFor="fullName">Nome</FormLabel>
                            <Skeleton isLoaded={!loading}>
                                <Input
                                    name="fullName"
                                    id="fullName"
                                    type="text"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Skeleton>
                            <FormErrorMessage>
                                {formik.errors.fullName}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.email && formik.touched.email
                            }
                        >
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Skeleton isLoaded={!loading}>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Skeleton>
                            <FormErrorMessage>
                                {formik.errors.email}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.phone && formik.touched.phone
                            }
                        >
                            <FormLabel htmlFor="phone">Telefone</FormLabel>
                            <Skeleton isLoaded={!loading}>
                                <Input
                                    name="phone"
                                    id="phone"
                                    type="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Skeleton>
                            <FormErrorMessage>
                                {formik.errors.phone}
                            </FormErrorMessage>
                        </FormControl>
                        <FormActions
                            isSubmitting={saving}
                            isLoaded={!loading}
                            onCancel={onCancel}
                        />
                    </Stack>
                )}
            </Formik>
        </>
    );
};

CustomerForm.propTypes = {
    data: PropTypes.shape({
        props: PropTypes.shape({
            email: PropTypes.string,
            fullName: PropTypes.string,
            phone: PropTypes.string,
        }),
        uuid: PropTypes.string,
    }),
    error: PropTypes.string,
    saving: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

CustomerForm.defaultProps = {
    loading: false,
};

export { CustomerForm };
