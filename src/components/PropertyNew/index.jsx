import { Heading, Stack, useToast } from '@chakra-ui/react';
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

    return (
        <Stack spacing={4}>
            <Heading as="h4" size="md">
                Cadastrar novo imovel
            </Heading>
            <PropertyForm
                error={error}
                success={success}
                saving={loading}
                onSubmit={submit}
                onCancel={handleCancel}
            />
        </Stack>
    );
};

export { PropertyNew };
