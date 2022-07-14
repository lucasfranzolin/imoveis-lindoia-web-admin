import { Box, Heading, Stack } from '@chakra-ui/react';

import { useCustomerCreate } from '../../hooks/useCustomerCreate';
import { CustomerForm } from '../shared/CustomerForm';

const CustomerNew = () => {
    const [{ error, done, loading }, submit] = useCustomerCreate();

    return (
        <Stack spacing={8}>
            <Heading>Cadastrar novo cliente</Heading>
            <Box bg="white" shadow="md" borderWidth={1} borderRadius="md" p={8}>
                <CustomerForm
                    error={error}
                    success={done && !error}
                    saving={loading}
                    onSubmit={submit}
                />
            </Box>
        </Stack>
    );
};

export { CustomerNew };
