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
import { Thumb } from './Thumb';
import { reorder } from './utils';

const GalleryPreview = ({ data, onRemove, onReorder, onClear }) => {
    const deleteRef = useRef(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
            deleteRef.current = index;
            const thumb = data[deleteRef.current];
            const isFile = thumb.index < 0;
            if (isFile) onRemove(deleteRef.current);
            else onOpen();
        },
        [data, onOpen, onRemove]
    );

    const handlePositive = () => {
        console.log(deleteRef.current);
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
                        />
                    ))}
                </Container>
            </Stack>
            <ConfirmationDialog
                header="Remover arquivo permanentemente?"
                body="Você não pode desfazer essa ação depois."
                isOpen={isOpen}
                onClose={onClose}
                onNegative={onClose}
                onPositive={handlePositive}
            />
        </>
    );
};

GalleryPreview.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            uuid: PropTypes.string,
            file: PropTypes.any,
        })
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
};

GalleryPreview.defaultProps = {
    data: [],
};

export { GalleryPreview };
