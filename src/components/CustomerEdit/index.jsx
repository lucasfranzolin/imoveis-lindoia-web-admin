import {
    Box,
    Heading,
    Stack,
    useToast,
    useUpdateEffect,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { useCustomerDetails } from '../../hooks/useCustomerDetails';
import { useCustomerUpdate } from '../../hooks/useCustomerUpdate';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { CustomerForm } from '../shared/CustomerForm';

const CustomerEdit = ({ id }) => {
    const router = useRouter();
    const toast = useToast();
    const [{ data, error, loading }, getDetails] = useCustomerDetails();
    const [{ done, error: updateError, loading: updating }, updateCustomer] =
        useCustomerUpdate();

    useEffectOnce(() => {
        getDetails(id);
    });

    useUpdateEffect(() => {
        if (!!error) {
            toast({
                position: 'top',
                title: 'Problema ao carregar dados do cliente.',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            router.push('/customers');
        }
    }, [error]);

    useUpdateEffect(() => {
        if (done && !updateError) {
            toast({
                position: 'top',
                description: 'Cliente atualizado com sucesso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            router.push('/customers');
        }
    }, [done, updateError]);

    const handleSubmit = (values, actions) => {
        updateCustomer(id, values);
        actions.setSubmitting(false);
    };

    return (
        <Stack spacing={8}>
            <Heading>Atualizar cliente</Heading>
            <Box bg="white" shadow="md" borderWidth={1} borderRadius="md" p={8}>
                <CustomerForm
                    error={error || updateError}
                    data={data}
                    loading={loading}
                    onSubmit={handleSubmit}
                    saving={updating}
                />
            </Box>
        </Stack>
    );
};

CustomerEdit.propTypes = {
    id: PropTypes.string.isRequired,
};

export { CustomerEdit };
