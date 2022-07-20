import { Button, Heading, HStack, Icon, Stack } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const Properties = () => {
    const router = useRouter();

    const handleClickNew = () => router.push('/properties/new');

    return (
        <Stack spacing={4}>
            <Heading>Imoveis</Heading>
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
                {/* rest */}
            </Stack>
        </Stack>
    );
};

export { Properties };
