import { Box, Button, Heading, HStack, Icon, Stack } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { usePagination } from '../../hooks/usePagination';
import { useProperties } from '../../hooks/useProperties';

const Properties = () => {
    const router = useRouter();
    const { page, pageSize, order, onNavigate, setPageSize, sort } =
        usePagination();
    const [{ data, loading }, paginate] = useProperties();

    useEffect(() => {
        paginate({
            page,
            pageSize,
            order,
        });
    }, [paginate, page, pageSize, order]);

    const handleClickNew = () => router.push('/properties/new');

    return (
        <Stack spacing={4}>
            <HStack alignItems="flex-start" justifyContent="space-between">
                <Heading as="h4" size="md">
                    Imoveis
                </Heading>
                <HStack alignItems="center" spacing={4}>
                    <Button
                        colorScheme="teal"
                        leftIcon={<Icon as={PlusIcon} />}
                        onClick={handleClickNew}
                    >
                        Novo
                    </Button>
                </HStack>
            </HStack>
            <Box>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </Box>
        </Stack>
    );
};

export { Properties };
