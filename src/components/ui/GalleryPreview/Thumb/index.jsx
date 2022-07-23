import {
    AspectRatio,
    Box,
    Icon,
    IconButton,
    Image,
    Tooltip,
} from '@chakra-ui/react';
import { MinusCircleIcon } from '@heroicons/react/solid';
import NextImage from 'next/image';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Thumb = ({ id, index, src, onRemove }) => {
    const handleRemove = (idx) => () => onRemove(idx);

    return (
        <Draggable draggableId={id} index={index}>
            {(draggable) => (
                <Box
                    position="relative"
                    ref={draggable.innerRef}
                    {...draggable.draggableProps}
                    {...draggable.dragHandleProps}
                >
                    <AspectRatio w="300px" ratio={4 / 3}>
                        <Image
                            as={NextImage}
                            alt={`preview-${index}`}
                            src={src}
                            layout="fill"
                            objectFit="cover"
                        />
                    </AspectRatio>
                    <Tooltip label="Remover">
                        <IconButton
                            variant="ghost"
                            isRound
                            colorScheme="red"
                            icon={<Icon as={MinusCircleIcon} />}
                            position="absolute"
                            top={1}
                            left={1}
                            onClick={handleRemove(index)}
                        />
                    </Tooltip>
                </Box>
            )}
        </Draggable>
    );
};

Thumb.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};

Thumb.defaultProps = {};

export { Thumb };
