import {
    Box,
    Heading,
    Stack,
    useToast,
    useUpdateEffect,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { useCustomerDelete } from '../../hooks/useCustomerDelete';
import { useCustomers } from '../../hooks/useCustomers';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../ui/Pagination';
import { DataTable } from './DataTable';

const Customers = () => {
    const router = useRouter();
    const toast = useToast();
    const toastIdRef = useRef();
    const { page, pageSize, onNavigate, reset, setPageSize } = usePagination();
    const [{ data, loading }, paginate] = useCustomers();
    const [{ loading: deleting, success, error }, _delete] =
        useCustomerDelete();

    useEffect(() => {
        paginate({ page, pageSize });
    }, [paginate, page, pageSize]);

    useUpdateEffect(() => {
        if (deleting) {
            toastIdRef.current = toast({
                position: 'top',
                description: 'Removendo cliente...',
                status: 'info',
            });
        }
    }, [deleting]);

    useUpdateEffect(() => {
        if (success) {
            toast({
                position: 'top',
                description: 'Cliente removido!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            toast.close(toastIdRef.current);
            paginate({ page, pageSize });
        }
    }, [success]);

    useUpdateEffect(() => {
        if (!!error) {
            toast({
                position: 'top',
                title: error,
                description: 'O cliente não foi removido.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            toast.close(toastIdRef.current);
        }
    }, [error]);

    const routeTo = (context) => (id) => {
        router.push(`${router.asPath}/${id}/${context}`);
    };

    return (
        <Stack spacing={8}>
            <Heading>Clientes</Heading>
            <Box bg="white" shadow="md" borderWidth={1} borderRadius="md" p={8}>
                <Stack spacing={4}>
                    <DataTable
                        rows={data.rows}
                        loading={loading}
                        onEdit={routeTo('edit')}
                        onDelete={_delete}
                        onClickRow={routeTo('details')}
                    />
                    <Pagination
                        subject="clientes"
                        totalItems={data.totalItems}
                        totalPages={data.totalPages}
                        page={page}
                        onNavigate={onNavigate}
                        onChange={setPageSize}
                    />
                </Stack>
            </Box>
        </Stack>
    );
};

export { Customers };
