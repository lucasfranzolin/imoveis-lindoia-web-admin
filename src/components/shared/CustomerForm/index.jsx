import {
    Alert,
    AlertDescription,
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

import { FormActions } from '../../ui/FormActions';
import { MaskedInput } from '../../ui/MaskedInput';
import { defaultValues, validationSchema } from './utils';

const CustomerForm = ({ error, data, loading, onSubmit, onCancel, saving }) => {
    const initialValues = useMemo(
        () =>
            data
                ? {
                      cpf: data.props.cpf,
                      email: data.props.email,
                      fullName: data.props.fullName,
                      phone: data.props.phone,
                  }
                : defaultValues,
        [data]
    );

    return (
        <>
            {!!error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Erro!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
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
                            <FormLabel htmlFor="phone">Celular</FormLabel>
                            <Skeleton isLoaded={!loading}>
                                <MaskedInput
                                    name="phone"
                                    id="phone"
                                    mask="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Skeleton>
                            <FormErrorMessage>
                                {formik.errors.phone}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={formik.errors.cpf && formik.touched.cpf}
                        >
                            <FormLabel htmlFor="cpf">CPF</FormLabel>
                            <Skeleton isLoaded={!loading}>
                                <MaskedInput
                                    name="cpf"
                                    id="cpf"
                                    mask="cpf"
                                    value={formik.values.cpf}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Skeleton>
                            <FormErrorMessage>
                                {formik.errors.cpf}
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
            cpf: PropTypes.string,
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
