import { Box, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useCustomerCreate } from '../../hooks/useCustomerCreate';
import { CustomerForm } from '../shared/CustomerForm';

const CustomerNew = () => {
    const router = useRouter();
    const [{ error, done, loading }, submit] = useCustomerCreate();

    const handleCancel = () => {
        router.push('/customers');
    };

    return (
        <Stack spacing={8}>
            <Heading>Cadastrar novo cliente</Heading>
            <Box bg="white" shadow="md" borderWidth={1} borderRadius="md" p={8}>
                <CustomerForm
                    error={error}
                    success={done && !error}
                    saving={loading}
                    onSubmit={submit}
                    onCancel={handleCancel}
                />
            </Box>
        </Stack>
    );
};

export { CustomerNew };
