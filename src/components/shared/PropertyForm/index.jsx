import { Button, Flex, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useReducer } from 'react';

import { useSteps } from '../../../hooks/useSteps';
import { initialState, reducer } from './reducer';
import { StepAddress } from './StepAddress';
import { StepAdvertise } from './StepAdvertise';
import { StepFeatures } from './StepFeatures';
import { StepOwner } from './StepOwner';
import { Stepper } from './Stepper';
import { StepperActions } from './StepperActions';
import * as types from './types';

const steps = ['Endereço', 'Proprietário', 'Caracterísitcas', 'Anunciar'];

const PropertyForm = ({ error, data, loading, onSubmit, onCancel, saving }) => {
    const { activeStep, nextStep, prevStep, reset } = useSteps(0);
    const [form, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = (type) => (payload) => {
        dispatch({ type, payload });
        nextStep();
    };

    const getStepContent = (index) => {
        switch (index) {
            case 0:
                return (
                    <StepAddress onSubmit={handleSubmit(types.ADDRESS)}>
                        <StepperActions onPrevious={prevStep} />
                    </StepAddress>
                );
            case 1:
                return (
                    <StepOwner onSubmit={handleSubmit(types.OWNER)}>
                        <StepperActions onPrevious={prevStep} />
                    </StepOwner>
                );
            case 2:
                return (
                    <StepFeatures onSubmit={handleSubmit(types.FEATURES)}>
                        <StepperActions onPrevious={prevStep} />
                    </StepFeatures>
                );
            case 3:
                return (
                    <StepAdvertise onSubmit={handleSubmit(types.ADVERTISE)}>
                        <StepperActions isLastStep onPrevious={prevStep} />
                    </StepAdvertise>
                );
            default:
                return (
                    <Flex px={4} py={4} width="100%" flexDirection="column">
                        <Heading fontSize="xl" textAlign="center">
                            Woohoo! All steps completed!
                        </Heading>
                        <Button mx="auto" mt={6} size="sm" onClick={reset}>
                            Reset
                        </Button>
                    </Flex>
                );
        }
    };

    return (
        <Flex width="100%" flexDirection="column">
            <Stepper steps={steps} activeStep={activeStep} />
            {getStepContent(activeStep)}
        </Flex>
    );
};

PropertyForm.propTypes = {
    data: PropTypes.shape({
        uuid: PropTypes.string,
        props: PropTypes.shape({
            address: PropTypes.shape({
                state: PropTypes.string.isRequired,
                city: PropTypes.string.isRequired,
                street: PropTypes.string.isRequired,
                number: PropTypes.string.isRequired,
                zip: PropTypes.string.isRequired,
                complement: PropTypes.string,
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
