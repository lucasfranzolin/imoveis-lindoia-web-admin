import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    HStack,
    Stack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useCallback, useReducer } from 'react';

import { useSteps } from '../../../hooks/useSteps';
import { STEPS } from './constants';
import { reducer } from './reducer';
import { Stepper } from './Stepper';
import { StepperActions } from './StepperActions';
import { StepAddress } from './steps/StepAddress';
import { StepAdvertise } from './steps/StepAdvertise';
import { StepFeatures } from './steps/StepFeatures';
import { StepLegal } from './steps/StepLegal';
import { StepOwner } from './steps/StepOwner';
import { StepReview } from './steps/StepReview';
import * as types from './types';
import { initState } from './utils';

const PropertyForm = ({ error, data, loading, onSubmit, onCancel, saving }) => {
    const { activeStep, nextStep, prevStep, reset } = useSteps(0);
    const [form, dispatch] = useReducer(reducer, initState(data));

    const handleSubmit = (type) => (payload) => {
        dispatch({
            type,
            payload,
        });
        nextStep();
    };

    const handleReset = useCallback(() => {
        dispatch({
            type: types.RESET,
            payload: initState(data),
        });
        reset();
        onCancel();
    }, [data, onCancel, reset]);

    const handleSave = useCallback(() => {
        const body = {
            address: { ...form[types.ADDRESS] },
            ...form[types.OWNER],
            ...form[types.FEATURES],
            ...form[types.ADVERTISE],
        };
        onSubmit(body);
    }, [form, onSubmit]);

    const getStepContent = (index) => {
        switch (index) {
            case 0:
                return (
                    <StepAddress
                        initialValues={form[types.ADDRESS]}
                        onSubmit={handleSubmit(types.ADDRESS)}
                    >
                        <StepperActions isFirstStep onPrevious={handleReset} />
                    </StepAddress>
                );
            case 1:
                return (
                    <StepOwner
                        initialValues={form[types.OWNER]}
                        onSubmit={handleSubmit(types.OWNER)}
                    >
                        <StepperActions onPrevious={prevStep} />
                    </StepOwner>
                );
            case 2:
                return (
                    <StepLegal
                        initialValues={form[types.LEGAL]}
                        onSubmit={handleSubmit(types.LEGAL)}
                    >
                        <StepperActions onPrevious={prevStep} />
                    </StepLegal>
                );
            case 3:
                return (
                    <StepFeatures
                        initialValues={form[types.FEATURES]}
                        onSubmit={handleSubmit(types.FEATURES)}
                    >
                        <StepperActions onPrevious={prevStep} />
                    </StepFeatures>
                );
            case 4:
                return (
                    <StepAdvertise
                        initialValues={form[types.ADVERTISE]}
                        onSubmit={handleSubmit(types.ADVERTISE)}
                    >
                        <StepperActions isLastStep onPrevious={prevStep} />
                    </StepAdvertise>
                );
            default:
                return (
                    <Stack>
                        <StepReview form={form} />
                        <HStack spacing={4} alignSelf="end">
                            <Button onClick={handleReset} isDisabled={saving}>
                                Desfazer
                            </Button>
                            <Button
                                colorScheme="teal"
                                onClick={handleSave}
                                isLoading={saving}
                                isDisabled={saving}
                                loadingText="Salvando..."
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Stack>
                );
        }
    };

    if (loading) return <span>Carregando..</span>;

    return (
        <Stack>
            {!!error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Erro!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Stepper steps={STEPS} activeStep={activeStep} />
            {getStepContent(activeStep)}
        </Stack>
    );
};

PropertyForm.propTypes = {
    data: PropTypes.shape({
        uuid: PropTypes.string,
        props: PropTypes.shape({
            address: PropTypes.shape({
                city: PropTypes.string.isRequired,
                complement: PropTypes.string,
                district: PropTypes.string.isRequired,
                number: PropTypes.string.isRequired,
                state: PropTypes.string.isRequired,
                street: PropTypes.string.isRequired,
                zip: PropTypes.string.isRequired,
            }),
            ownerId: PropTypes.string.isRequired,
            purpose: PropTypes.string.isRequired,
            rent: PropTypes.shape({
                isAnnounced: PropTypes.bool.isRequired,
                value: PropTypes.number.isRequired,
            }).isRequired,
            sale: PropTypes.shape({
                isAnnounced: PropTypes.bool.isRequired,
                value: PropTypes.number.isRequired,
            }).isRequired,
            type: PropTypes.string.isRequired,
        }),
    }),
    error: PropTypes.string,
    saving: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

PropertyForm.defaultProps = {
    loading: false,
};

export { PropertyForm };
