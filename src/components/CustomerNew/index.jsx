import { Heading, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useCustomerCreate } from '../../hooks/useCustomerCreate';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { CustomerForm } from '../shared/CustomerForm';

const CustomerNew = () => {
    const router = useRouter();
    const toast = useToast();
    const [{ error, success, loading }, submit] = useCustomerCreate();

    useUpdateEffect(() => {
        if (success) {
            toast({
                position: 'top',
                description: 'Cliente criado com sucesso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            handleCancel();
        }
    }, [success]);

    const handleCancel = () => router.push('/customers');

    const handleSubmit = (values, actions) => {
        submit(values);
        actions.setSubmitting(false);
    };

    return (
        <Stack spacing={4}>
            <Heading as="h4" size="md">
                Cadastrar novo cliente
            </Heading>
            <CustomerForm
                error={error}
                success={success}
                saving={loading}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </Stack>
    );
};

export { CustomerNew };
