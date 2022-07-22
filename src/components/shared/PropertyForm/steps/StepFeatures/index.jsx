import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import { useEffectOnce } from '../../../../../hooks/useEffectOnce';
import { usePropertyPurposes } from '../../../../../hooks/usePropertyPurposes';
import { usePropertyTypes } from '../../../../../hooks/usePropertyTypes';
import { SelectAsync } from '../../../../ui/SelectAsync';
import { validationSchema } from './utils';

const StepFeatures = ({ initialValues, children, onSubmit }) => {
    const [{ data: purposes, loading: fetchingPurposes }, getPurposes] =
        usePropertyPurposes();
    const [
        { data: types, loading: fetchingTypes, reset: resetTypes },
        getTypes,
    ] = usePropertyTypes();

    useEffectOnce(() => {
        getPurposes();
        getTypes(initialValues.purpose);
    });

    const handleChangePurpose = (formik) => (e) => {
        formik.setFieldValue('type', '');
        if (e.target.value === '') resetTypes();
        else getTypes(e.target.value);
        formik.handleChange(e);
    };

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
                    <FormControl
                        isRequired
                        isInvalid={
                            formik.errors.purpose && formik.touched.purpose
                        }
                        maxW="md"
                    >
                        <FormLabel htmlFor="purpose">Propósito</FormLabel>
                        <SelectAsync
                            isLoading={fetchingPurposes}
                            name="purpose"
                            id="purpose"
                            value={formik.values.purpose}
                            onChange={handleChangePurpose(formik)}
                            onBlur={formik.handleBlur}
                        >
                            <option value="" />
                            {purposes.map((purpose) => (
                                <option
                                    key={`purpose-${purpose}`}
                                    value={purpose}
                                >
                                    {purpose.toUpperCase()}
                                </option>
                            ))}
                        </SelectAsync>
                        <FormErrorMessage>
                            {formik.errors.purpose}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={formik.errors.type && formik.touched.type}
                        maxW="md"
                    >
                        <FormLabel htmlFor="type">Tipo</FormLabel>
                        <SelectAsync
                            isLoading={fetchingTypes}
                            name="type"
                            id="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="" />
                            {types.map((type) => (
                                <option key={`type-${type}`} value={type}>
                                    {type.toUpperCase()}
                                </option>
                            ))}
                        </SelectAsync>
                        <FormErrorMessage>
                            {formik.errors.type}
                        </FormErrorMessage>
                    </FormControl>
                    {children}
                </Stack>
            )}
        </Formik>
    );
};

StepFeatures.propTypes = {
    initialValues: PropTypes.shape({
        purpose: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export { StepFeatures };
