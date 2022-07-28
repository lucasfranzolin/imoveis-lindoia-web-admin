import {
    AspectRatio,
    Flex,
    Icon,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react';
import { DotsVerticalIcon, PencilIcon, XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Thumb = ({ id, index, src, onRemove, onEdit }) => {
    let red = useColorModeValue('red.500', 'red.300');

    const handleMenuRemove = (idx) => () => onRemove(idx);

    const handleMenuEdit = (idx) => () => onEdit(idx);

    return (
        <Draggable draggableId={id} index={index}>
            {(draggable) => (
                <Flex
                    direction="column"
                    ref={draggable.innerRef}
                    {...draggable.draggableProps}
                    {...draggable.dragHandleProps}
                >
                    <Menu>
                        <Tooltip label="Mais opções" placement="top">
                            <MenuButton
                                as={IconButton}
                                alignSelf="flex-end"
                                size="xs"
                                icon={<Icon as={DotsVerticalIcon} />}
                            />
                        </Tooltip>
                        <MenuList>
                            <MenuItem
                                icon={<Icon as={PencilIcon} />}
                                onClick={handleMenuEdit(index)}
                            >
                                Editar
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                                textColor={red}
                                icon={<Icon as={XIcon} />}
                                onClick={handleMenuRemove(index)}
                            >
                                Remover
                            </MenuItem>
                        </MenuList>
                    </Menu>
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
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

Thumb.defaultProps = {};

export { Thumb };
