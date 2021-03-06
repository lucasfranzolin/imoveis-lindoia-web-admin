import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import { useEffectOnce } from '../../../../../hooks/useEffectOnce';
import { useLocalityCities } from '../../../../../hooks/useLocalityCities';
import { useLocalityStates } from '../../../../../hooks/useLocalityStates';
import { configHttp } from '../../../../../utils/http';
import { SelectAsync } from '../../../../ui/SelectAsync';
import { StepperActions } from '../../StepperActions';
import { validationSchema } from './utils';

const http = configHttp('client');

const StepAddress = ({ initialValues, onPrevious, onSubmit }) => {
    const [{ data: states, loading: fetchingStates }, getStates] =
        useLocalityStates();
    const [
        { data: cities, loading: fetchingCities, reset: resetCities },
        getCities,
    ] = useLocalityCities();

    useEffectOnce(() => {
        getStates();
        getCities(initialValues.state);
    });

    const handleBlurZip = (formik) => (e) => {
        if (formik.errors.zip) return;
        http.get(`/api/localities/zip/${e.target.value}`)
            .then((response) => {
                const { logradouro, bairro, localidade, uf } = response.data;
                formik.setFieldValue('street', logradouro);
                formik.setFieldValue('district', bairro);
                formik.setFieldValue('city', localidade);
                formik.setFieldValue('state', uf);
                return uf;
            })
            .then(getCities)
            .finally(() => formik.handleBlur(e));
    };

    const handleChangeState = (formik) => (e) => {
        formik.setFieldValue('city', '');
        if (e.target.value === '') resetCities();
        else getCities(e.target.value);
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
                    <Grid templateColumns="repeat(6, 1fr)" gap={8}>
                        <GridItem colSpan={[6, 6, 2]}>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.zip && formik.touched.zip
                                }
                            >
                                <FormLabel htmlFor="zip">CEP</FormLabel>
                                <Input
                                    variant="filled"
                                    name="zip"
                                    id="zip"
                                    value={formik.values.zip}
                                    onChange={formik.handleChange}
                                    onBlur={handleBlurZip(formik)}
                                />
                                <FormErrorMessage>
                                    {formik.errors.zip}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[6, 6, 2]}>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.state && formik.touched.state
                                }
                            >
                                <FormLabel htmlFor="state">Estado</FormLabel>
                                <SelectAsync
                                    variant="filled"
                                    isLoading={fetchingStates}
                                    name="state"
                                    id="state"
                                    value={formik.values.state}
                                    onChange={handleChangeState(formik)}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="" />
                                    {states.map(({ id, label, value }) => (
                                        <option
                                            key={`addr.state-${id}`}
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))}
                                </SelectAsync>
                                <FormErrorMessage>
                                    {formik.errors.state}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[6, 6, 2]}>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.city && formik.touched.city
                                }
                            >
                                <FormLabel htmlFor="city">Cidade</FormLabel>
                                <SelectAsync
                                    variant="filled"
                                    isLoading={fetchingCities}
                                    name="city"
                                    id="city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="" />
                                    {cities.map(({ id, label, value }) => (
                                        <option
                                            key={`addr.city-${id}`}
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))}
                                </SelectAsync>
                                <FormErrorMessage>
                                    {formik.errors.city}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[6, 6, 3]}>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.district &&
                                    formik.touched.district
                                }
                            >
                                <FormLabel htmlFor="district">Bairro</FormLabel>
                                <Input
                                    variant="filled"
                                    name="district"
                                    id="district"
                                    type="text"
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <FormErrorMessage>
                                    {formik.errors.district}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[6, 6, 3]}>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.street &&
                                    formik.touched.street
                                }
                            >
                                <FormLabel htmlFor="street">
                                    Logradouro
                                </FormLabel>
                                <Input
                                    variant="filled"
                                    name="street"
                                    id="street"
                                    type="text"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <FormErrorMessage>
                                    {formik.errors.street}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[3, 3, 2]}>
                            <FormControl
                                isRequired
                                isInvalid={
                                    formik.errors.number &&
                                    formik.touched.number
                                }
                            >
                                <FormLabel htmlFor="number">N??mero</FormLabel>
                                <Input
                                    variant="filled"
                                    name="number"
                                    id="number"
                                    value={formik.values.number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <FormErrorMessage>
                                    {formik.errors.number}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={[3, 3, 2]}>
                            <FormControl>
                                <FormLabel htmlFor="complement">
                                    Complemento
                                </FormLabel>
                                <Input
                                    variant="filled"
                                    name="complement"
                                    id="complement"
                                    type="text"
                                    value={formik.values.complement}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <StepperActions isFirstStep onPrevious={onPrevious} />
                </Stack>
            )}
        </Formik>
    );
};

StepAddress.propTypes = {
    initialValues: PropTypes.shape({
        city: PropTypes.string.isRequired,
        complement: PropTypes.string,
        district: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepAddress };
