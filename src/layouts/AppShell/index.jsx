import {
    Box,
    Button,
    DarkMode,
    Flex,
    Icon,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react';
import { MenuIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { ROUTES } from './constants';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { UserMenu } from './UserMenu';

const AppShell = ({ children }) => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                bg="gray.900"
                textColor="white"
                px={8}
            >
                <Flex
                    h={16}
                    alignItems="center"
                    justifyContent="space-between"
                    maxW="6xl"
                    w="full"
                >
                    <DarkMode>
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
                    </DarkMode>
                    <DesktopNav routes={ROUTES} />
                    <DarkMode>
                        <UserMenu src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
                    </DarkMode>
                </Flex>
                <MobileNav isOpen={isOpen} routes={ROUTES} />
            </Flex>
            <Flex
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                p={8}
            >
                <Box maxW="6xl" w="full">
                    {children}
                </Box>
            </Flex>
        </>
    );
};

AppShell.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppShell };
