import {
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import { StepperActions } from '../../StepperActions';
import { validationSchema } from './utils';

const StepAdvertise = ({ initialValues, onPrevious, onSubmit }) => {
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {(formik) => (
                <Stack as={Form} spacing={8} alignItems="flex-start">
                    <Stack spacing={8} maxW="md">
                        <HStack spacing={4}>
                            <Heading as="h3" size="md">
                                Venda
                            </Heading>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.sale?.isAnnounced &&
                                    formik.touched.sale?.isAnnounced
                                }
                            >
                                <Checkbox
                                    name="sale.isAnnounced"
                                    checked={formik.values.sale.isAnnounced}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    Anunciar
                                </Checkbox>
                            </FormControl>
                        </HStack>
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.sale?.value &&
                                formik.touched.sale?.value
                            }
                        >
                            <FormLabel htmlFor="sale.value">
                                Preço de venda
                            </FormLabel>
                            <Input
                                variant="filled"
                                name="sale.value"
                                id="sale.value"
                                type="number"
                                value={formik.values.sale.value}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>
                                {formik.errors.sale?.value}
                            </FormErrorMessage>
                        </FormControl>
                    </Stack>
                    <Stack spacing={8} maxW="md">
                        <HStack spacing={4}>
                            <Heading as="h3" size="md">
                                Aluguel
                            </Heading>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.rent?.isAnnounced &&
                                    formik.touched.rent?.isAnnounced
                                }
                            >
                                <Checkbox
                                    name="rent.isAnnounced"
                                    checked={formik.values.rent.isAnnounced}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    Anunciar
                                </Checkbox>
                            </FormControl>
                        </HStack>
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.rent?.value &&
                                formik.touched.rent?.value
                            }
                        >
                            <FormLabel htmlFor="rent.value">
                                Preço do aluguel
                            </FormLabel>
                            <Input
                                variant="filled"
                                name="rent.value"
                                id="rent.value"
                                type="number"
                                value={formik.values.rent.value}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>
                                {formik.errors.rent?.value}
                            </FormErrorMessage>
                        </FormControl>
                    </Stack>
                    <StepperActions onPrevious={onPrevious} />
                </Stack>
            )}
        </Formik>
    );
};

StepAdvertise.propTypes = {
    initialValues: PropTypes.shape({
        rent: PropTypes.shape({
            isAnnounced: PropTypes.bool.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired,
        sale: PropTypes.shape({
            isAnnounced: PropTypes.bool.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepAdvertise };
