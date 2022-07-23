import { Box, Button, Heading, HStack, Icon, Stack } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const Properties = () => {
    const router = useRouter();

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
            <Box></Box>
        </Stack>
    );
};

export { Properties };
