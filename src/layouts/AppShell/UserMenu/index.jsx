import {
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const UserMenu = ({ src }) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
            >
                <Avatar size="sm" src={src} />
            </MenuButton>
            <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
            </MenuList>
        </Menu>
    );
};

UserMenu.propTypes = {
    src: PropTypes.string.isRequired,
};

export { UserMenu };
