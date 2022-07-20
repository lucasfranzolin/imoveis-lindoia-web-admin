import { Button, HStack, Icon } from '@chakra-ui/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const DetailsActions = ({ onEdit, onDelete }) => {
    return (
        <HStack spacing={4}>
            <Button
                leftIcon={<Icon as={PencilIcon} />}
                colorScheme="teal"
                onClick={onEdit}
            >
                Editar
            </Button>
            <Button
                leftIcon={<Icon as={TrashIcon} />}
                variant="ghost"
                onClick={onDelete}
            >
                Apagar
            </Button>
        </HStack>
    );
};

DetailsActions.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

DetailsActions.defaultProps = {
    isLoaded: true,
};

export { DetailsActions };
