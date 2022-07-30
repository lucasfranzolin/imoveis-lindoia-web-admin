import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import { useCustomers } from '../../../../../hooks/useCustomers';
import { useEffectOnce } from '../../../../../hooks/useEffectOnce';
import { SelectAsync } from '../../../../ui/SelectAsync';
import { StepperActions } from '../../StepperActions';
import { validationSchema } from './utils';

const StepOwner = ({ initialValues, onPrevious, onSubmit }) => {
    const [{ data, loading }, paginate] = useCustomers();

    useEffectOnce(() => {
        paginate({
            page: 1,
            pageSize: 999999,
            order: 1,
            sortBy: 'fullName',
        });
    });

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
                            formik.errors.ownerId && formik.touched.ownerId
                        }
                        maxW="md"
                    >
                        <FormLabel htmlFor="ownerId">Proprietario</FormLabel>
                        <SelectAsync
                            variant="filled"
                            isLoading={loading}
                            name="ownerId"
                            id="ownerId"
                            value={formik.values.ownerId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="" />
                            {data.rows.map((customer) => (
                                <option
                                    key={`customer-${customer.uuid}`}
                                    value={customer.uuid}
                                >
                                    {customer.props.fullName}
                                </option>
                            ))}
                        </SelectAsync>
                        <FormErrorMessage>
                            {formik.errors.ownerId}
                        </FormErrorMessage>
                    </FormControl>
                    <StepperActions onPrevious={onPrevious} />
                </Stack>
            )}
        </Formik>
    );
};

StepOwner.propTypes = {
    initialValues: PropTypes.shape({
        ownerId: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepOwner };
