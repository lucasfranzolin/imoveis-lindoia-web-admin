import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    useColorMode,
    useDisclosure,
} from '@chakra-ui/react';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

import { ROUTES } from './constants';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { UserMenu } from './UserMenu';

const AppShell = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Flex
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                px={8}
                py={4}
                fontSize="lg"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    maxW="6xl"
                    w="full"
                >
                    <IconButton
                        size="md"
                        icon={
                            isOpen ? (
                                <Icon as={XIcon} />
                            ) : (
                                <Icon as={MenuIcon} />
                            )
                        }
                        aria-label="Abrir menu"
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <DesktopNav routes={ROUTES} />
                    <Flex>
                        <IconButton
                            icon={
                                <Icon
                                    as={
                                        colorMode === 'light'
                                            ? MoonIcon
                                            : SunIcon
                                    }
                                />
                            }
                            onClick={toggleColorMode}
                            mr={4}
                        />
                        <UserMenu src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
                    </Flex>
                </Flex>
                <MobileNav isOpen={isOpen} routes={ROUTES} />
            </Flex>
            <Box p={8}>
                <Box maxW="6xl" w="full" mx="auto">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

AppShell.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppShell };
