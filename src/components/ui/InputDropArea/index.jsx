import { Box, Button, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react';
import { UploadIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const InputDropArea = ({ options, onChange }) => {
    const { isDragActive, getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted: onChange,
        ...options,
    });

    return (
        <Box
            {...getRootProps()}
            w="md"
            borderWidth={1}
            borderStyle="dashed"
            borderRadius="md"
            bg={isDragActive ? 'gray.100' : 'white'}
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
                    <Text as="span" fontSize="sm" textColor="gray.600">
                        ou arraste e solte.
                    </Text>
                </HStack>
                <Text as="span" fontSize="xs" textColor="gray.600">
                    PNG ou JPG até 2MB.
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
