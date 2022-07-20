import { HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Logo } from '../Logo';
import { NavItem } from '../NavItem';

const DesktopNav = ({ routes }) => {
    const router = useRouter();

    return (
        <HStack spacing={4} alignItems="center">
            <Logo />
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                {routes.map((route) => (
                    <NavItem
                        key={route.href}
                        href={route.href}
                        isActive={router.asPath.startsWith(route.href)}
                    >
                        {route.label}
                    </NavItem>
                ))}
            </HStack>
        </HStack>
    );
};

DesktopNav.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export { DesktopNav };
