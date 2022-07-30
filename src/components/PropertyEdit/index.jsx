import { Heading, Stack, useToast, useUpdateEffect } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { useEffectOnce } from '../../hooks/useEffectOnce';
import { usePropertyDetails } from '../../hooks/usePropertyDetails';
import { usePropertyUpdate } from '../../hooks/usePropertyUpdate';
import { PropertyForm } from '../shared/PropertyForm';

const PropertyEdit = ({ id }) => {
    const router = useRouter();
    const toast = useToast();
    const [{ data, error, loading }, getDetails] = usePropertyDetails();
    const [
        {
            success, //
            error: updateError,
            loading: updating,
        },
        updateProperty,
    ] = usePropertyUpdate();

    useEffectOnce(() => {
        getDetails(id);
    });

    useUpdateEffect(() => {
        if (success) {
            toast({
                position: 'top',
                description: 'Imóvel atualizado com sucesso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            handleCancel();
        }
    }, [success]);

    const handleCancel = () => {
        router.push(`/properties/${id}/details`);
    };

    const handleSubmit = (body, files) => {
        console.log(`id = ${id}`, { body, files });
    };

    return (
        <Stack spacing={4}>
            <Heading as="h4" size="md">
                Atualizar imóvel
            </Heading>
            {/* TODO remove conditional rendering and trigger autocomplete at PropertyForm */}
            {data && (
                <PropertyForm
                    data={data}
                    error={error || updateError}
                    loading={loading || !data}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                    saving={updating}
                />
            )}
        </Stack>
    );
};

PropertyEdit.propTypes = {
    id: PropTypes.string.isRequired,
};

export { PropertyEdit };
