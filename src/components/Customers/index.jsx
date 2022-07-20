import {
    Button,
    Heading,
    HStack,
    Icon,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { useCustomerDelete } from '../../hooks/useCustomerDelete';
import { useCustomers } from '../../hooks/useCustomers';
import { usePagination } from '../../hooks/usePagination';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { Pagination } from '../ui/Pagination';
import { DataTable } from './DataTable';

const Customers = () => {
    const router = useRouter();
    const toast = useToast();
    const toastIdRef = useRef();
    const { page, pageSize, order, sortBy, onNavigate, setPageSize, sort } =
        usePagination('fullName');
    const [{ data, loading }, paginate] = useCustomers();
    const [{ success, error }, _delete] = useCustomerDelete();

    useEffect(() => {
        paginate({
            page,
            pageSize,
            order,
            sortBy,
        });
    }, [paginate, page, pageSize, order, sortBy]);

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

    const handleClickNew = () => router.push('/customers/new');

    const routeTo = (context) => (id) =>
        router.push(`${router.asPath}/${id}/${context}`);

    return (
        <Stack spacing={4}>
            <Heading>Clientes</Heading>
            <Stack
                bg="white"
                borderWidth={1}
                borderRadius="md"
                p={8}
                spacing={4}
            >
                <HStack>
                    <Button
                        colorScheme="teal"
                        leftIcon={<Icon as={PlusIcon} />}
                        onClick={handleClickNew}
                    >
                        Novo
                    </Button>
                </HStack>
                <DataTable
                    header={[
                        {
                            label: 'Nome',
                            accessor: 'fullName',
                        },
                        {
                            label: 'Email',
                            accessor: 'email',
                        },
                        {
                            label: 'Telefone',
                            accessor: 'phone',
                        },
                    ]}
                    loading={loading}
                    onClickRow={routeTo('details')}
                    onDelete={_delete}
                    onEdit={routeTo('edit')}
                    onSort={sort}
                    order={order}
                    rows={data.rows}
                    sortBy={sortBy}
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
        </Stack>
    );
};

export { Customers };
