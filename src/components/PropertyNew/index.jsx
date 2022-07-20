import { Box, Heading, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { usePropertyCreate } from '../../hooks/usePropertyCreate';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { PropertyForm } from '../shared/PropertyForm';

const PropertyNew = () => {
    const router = useRouter();
    const toast = useToast();
    const [{ error, success, loading }, submit] = usePropertyCreate();

    useUpdateEffect(() => {
        if (success) {
            toast({
                position: 'top',
                description: 'Imóvel criado com sucesso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            handleCancel();
        }
    }, [success]);

    const handleCancel = () => router.push('/properties');

    const handleSubmit = (values, actions) => {
        submit(values);
        actions.setSubmitting(false);
    };

    return (
        <Stack spacing={4}>
            <Heading>Cadastrar novo imóvel</Heading>
            <Box bg="white" borderWidth={1} borderRadius="md" p={8}>
                <PropertyForm
                    error={error}
                    success={success}
                    saving={loading}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Box>
        </Stack>
    );
};

export { PropertyNew };
