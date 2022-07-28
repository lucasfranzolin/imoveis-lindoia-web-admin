import {
    Button,
    Flex,
    Icon,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';

import { ConfirmationDialog } from '../ConfirmationDialog';
import { Container } from './Container';
import { MetadataDialog } from './MetadataDialog';
import { Thumb } from './Thumb';
import { reorder } from './utils';

const GalleryPreview = ({
    data,
    onSubmitMetadata,
    onRemove,
    onReorder,
    onClear,
}) => {
    const editingRef = useRef(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isConfirming,
        onOpen: onOpenConfirmation,
        onClose: onCloseConfirmation,
    } = useDisclosure();

    const handleDragEnd = useCallback(
        (result) => {
            if (!result.destination) return;
            if (result.destination.index === result.source.index) return;

            const newArr = reorder(
                data,
                result.source.index,
                result.destination.index
            );
            onReorder(newArr);
        },
        [data, onReorder]
    );

    const handleDelete = useCallback(
        (index) => {
            editingRef.current = index;
            const thumb = data[editingRef.current];
            const isFile = thumb.prevIndex < 0;
            if (isFile) onRemove(editingRef.current, isFile);
            else onOpenConfirmation();
        },
        [data, onOpenConfirmation, onRemove]
    );

    const handleEdit = (index) => {
        editingRef.current = index;
        onOpen();
    };

    const handlePositiveConfirmation = useCallback(() => {
        onClose();
        onRemove(editingRef.current, false);
    }, [onClose, onRemove]);

    const handleSubmitMetadata = (metadata) => {
        onClose();
        onSubmitMetadata(editingRef.current, metadata);
    };

    return (
        <>
            <Stack w="full">
                <Flex justifyContent="space-between">
                    <Flex direction="column">
                        <Text fontWeight="bold">Galeria de fotos</Text>
                        <Text
                            fontSize="xs"
                            textColor={useColorModeValue(
                                'gray.600',
                                'gray.400'
                            )}
                        >
                            Segure e arraste para o lado para ordenar.
                        </Text>
                    </Flex>
                    <Button
                        variant="ghost"
                        leftIcon={<Icon as={TrashIcon} />}
                        onClick={onClear}
                        alignSelf="end"
                    >
                        Limpar
                    </Button>
                </Flex>
                <Container onDragEnd={handleDragEnd}>
                    {data.map((item, index) => (
                        <Thumb
                            key={item.uuid}
                            id={item.uuid}
                            index={index}
                            src={item.url}
                            onRemove={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </Container>
            </Stack>
            <MetadataDialog
                initialValues={{
                    description: data[editingRef.current]?.description,
                }}
                index={editingRef.current}
                src={data[editingRef.current]?.url}
                isOpen={isOpen}
                onClose={onClose}
                onCancel={onClose}
                onSubmit={handleSubmitMetadata}
            />
            <ConfirmationDialog
                header="Remover arquivo permanentemente?"
                body="Você não pode desfazer essa ação depois."
                isOpen={isConfirming}
                onClose={onCloseConfirmation}
                onNegative={onCloseConfirmation}
                onPositive={handlePositiveConfirmation}
            />
        </>
    );
};

GalleryPreview.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            uuid: PropTypes.string,
            description: PropTypes.string,
            file: PropTypes.any,
        })
    ).isRequired,
    onSubmitMetadata: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
};

GalleryPreview.defaultProps = {
    data: [],
};

export { GalleryPreview };
