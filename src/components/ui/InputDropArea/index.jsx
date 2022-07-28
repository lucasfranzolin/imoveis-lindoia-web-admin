import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Input,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { UploadIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const InputDropArea = ({ options, onChange }) => {
    let activeBg = useColorModeValue('gray.100', 'gray.700');
    let subtitle = useColorModeValue('gray.600', 'gray.400');
    const toast = useToast();
    const { isDragActive, getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted: onChange,
        onDropRejected: () => {
            toast({
                position: 'top',
                title: 'Impossível carregar arquivo.',
                description: 'Ou ele é muito grande ou o formato não é válido.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
        ...options,
    });

    return (
        <Box
            {...getRootProps()}
            w="md"
            borderWidth={1}
            borderStyle="dashed"
            borderRadius="md"
            bg={isDragActive ? activeBg : undefined}
        >
            <Input {...getInputProps()} />
            <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                py={4}
            >
                <Icon as={UploadIcon} mb={2} />
                <HStack spacing={1}>
                    <Button
                        colorScheme="teal"
                        variant="link"
                        size="sm"
                        onClick={open}
                    >
                        Clique para carregar
                    </Button>
                    <Text as="span" fontSize="sm" textColor={subtitle}>
                        ou arraste e solte.
                    </Text>
                </HStack>
                <Text as="span" fontSize="xs" textColor={subtitle}>
                    PNG, JPEG ou JPG até 1MB.
                </Text>
            </Flex>
        </Box>
    );
};

InputDropArea.propTypes = {
    options: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

InputDropArea.defaultProps = {
    options: {},
};

export { InputDropArea };
