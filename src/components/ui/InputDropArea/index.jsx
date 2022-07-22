import {
    Box,
    Button,
    HStack,
    Icon,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react';
import { UploadIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

import { useImgDropzone } from '../../../hooks/useImgDropzone';

const InputDropArea = ({ defaultFiles, onChange }) => {
    const {
        getRootProps, //
        getInputProps,
        isDragActive,
        open,
        files,
        onClear,
    } = useImgDropzone(defaultFiles, onChange);

    return (
        <Box
            {...getRootProps()}
            w="md"
            borderWidth={1}
            borderRadius="md"
            bg={isDragActive ? 'gray.100' : 'white'}
        >
            <Input {...getInputProps()} />
            <Stack alignItems="center" justifyContent="center" mx="auto" py={4}>
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
                    <Text as="span" fontSize="sm" textColor="gray.600">
                        ou arraste e solte
                    </Text>
                </HStack>
                <Text as="span" fontSize="xs" textColor="gray.600">
                    PNG ou JPG até 2MB
                </Text>
            </Stack>
        </Box>
    );
};

InputDropArea.propTypes = {
    defaultFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
};

export { InputDropArea };
