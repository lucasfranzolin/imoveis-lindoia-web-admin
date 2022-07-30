import {
    Button,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { PlusIcon, SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useCustomerDelete } from '../../hooks/useCustomerDelete';
import { useCustomers } from '../../hooks/useCustomers';
import { useDebounce } from '../../hooks/useDebounce';
import { usePagination } from '../../hooks/usePagination';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';
import { DataTable } from '../ui/DataTable';
import { Pagination } from '../ui/Pagination';

const Customers = () => {
    const router = useRouter();
    const toast = useToast();
    const deleteRef = useRef();
    const [search, setSearch] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        }
    }, [error]);

    useDebounce(
        () => {
            console.log('search', search);
        },
        500,
        [search]
    );

    const handleClickNew = () => router.push('/customers/new');

    const routeTo = (context) => (row) =>
        router.push(`${router.asPath}/${row.uuid}/${context}`);

    const handleDelete = (row) => {
        deleteRef.current = row;
        onOpen();
    };

    const handlePositive = () => {
        onClose();
        _delete(deleteRef.current.uuid);
    };

    return (
        <>
            <Stack spacing={4}>
                <HStack alignItems="flex-start" justifyContent="space-between">
                    <Heading as="h4" size="md">
                        Clientes
                    </Heading>
                    <HStack alignItems="center" spacing={4}>
                        <Button
                            colorScheme="teal"
                            leftIcon={<Icon as={PlusIcon} />}
                            onClick={handleClickNew}
                        >
                            Novo
                        </Button>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={SearchIcon} color="gray.300" />
                            </InputLeftElement>
                            <Input
                                variant="filled"
                                type="text"
                                placeholder="Buscar"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InputGroup>
                    </HStack>
                </HStack>
                <DataTable
                    header={[
                        {
                            label: 'Nome',
                            accessor: 'fullName',
                            sortable: true,
                        },
                        {
                            label: 'Email',
                            accessor: 'email',
                            sortable: false,
                        },
                        {
                            label: 'Telefone',
                            accessor: 'phone',
                            sortable: false,
                        },
                    ]}
                    loading={loading}
                    onClickRow={routeTo('details')}
                    onEdit={routeTo('edit')}
                    onDelete={handleDelete}
                    onSort={sort}
                    order={order}
                    rows={data.rows}
                    sortBy={sortBy}
                />
                <Pagination
                    px={6}
                    pb={4}
                    subject="clientes"
                    totalItems={data.totalItems}
                    totalPages={data.totalPages}
                    page={page}
                    onNavigate={onNavigate}
                    onChange={setPageSize}
                />
            </Stack>
            <ConfirmationDialog
                body="Você não pode desfazer essa ação depois."
                header={`Apagar cliente '${deleteRef.current?.props.fullName}'?`}
                isOpen={isOpen}
                onClose={onClose}
                onNegative={onClose}
                onPositive={handlePositive}
            />
        </>
    );
};

export { Customers };
