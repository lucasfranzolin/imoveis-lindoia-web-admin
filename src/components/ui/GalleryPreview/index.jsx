import { Flex, Stack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { Container } from './Container';
import { Thumb } from './Thumb';
import { reorder } from './utils';

const GalleryPreview = ({ data, onRemove, onReorder }) => {
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

    return (
        <Stack spacing={6} w="full">
            <Flex direction="column">
                <Text fontWeight="bold">Galeria de fotos</Text>
                <Text fontSize="xs" textColor="gray.600">
                    Segure e arraste para o lado para ordenar.
                </Text>
            </Flex>
            <Container onDragEnd={handleDragEnd}>
                {data.map((item, index) => (
                    <Thumb
                        key={item.id}
                        id={item.id}
                        index={index}
                        src={item.url}
                        onRemove={onRemove}
                    />
                ))}
            </Container>
        </Stack>
    );
};

GalleryPreview.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            id: PropTypes.string,
        })
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,
};

GalleryPreview.defaultProps = {
    data: [],
};

export { GalleryPreview };
