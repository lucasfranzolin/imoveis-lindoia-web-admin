import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import { StepperActions } from '../../StepperActions';
import { validationSchema } from './utils';

const StepLegal = ({ initialValues, onPrevious, onSubmit }) => {
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
                        <FormControl
                            isRequired
                            isInvalid={
                                formik.errors.registry &&
                                formik.touched.registry
                            }
                        >
                            <FormLabel htmlFor="registry">Matrícula</FormLabel>
                            <Input
                                variant="filled"
                                name="registry"
                                id="registry"
                                value={formik.values.registry}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>
                                {formik.errors.registry}
                            </FormErrorMessage>
                        </FormControl>
                    </Stack>
                    <StepperActions onPrevious={onPrevious} />
                </Stack>
            )}
        </Formik>
    );
};

StepLegal.propTypes = {
    initialValues: PropTypes.shape({
        registry: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepLegal };
