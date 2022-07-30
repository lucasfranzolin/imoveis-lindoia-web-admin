import {
    AspectRatio,
    Flex,
    Icon,
    IconButton,
    Image,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Thumb = ({ id, index, src, onRemove }) => {
    let red = useColorModeValue('red.500', 'red.300');

    const handleRemove = (idx) => () => onRemove(idx);

    return (
        <Draggable draggableId={id} index={index}>
            {(draggable) => (
                <Flex
                    direction="column"
                    ref={draggable.innerRef}
                    alignItems="flex-end"
                    {...draggable.draggableProps}
                    {...draggable.dragHandleProps}
                >
                    <Tooltip label="Remover" placement="top">
                        <IconButton
                            size="sm"
                            textColor={red}
                            icon={<Icon as={TrashIcon} />}
                            onClick={handleRemove(index)}
                        />
                    </Tooltip>
                    <AspectRatio w="300px" ratio={4 / 3} mt={2} borderWidth={1}>
                        <Image
                            alt={`preview-${index}`}
                            src={src}
                            objectFit="cover"
                        />
                    </AspectRatio>
                </Flex>
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
