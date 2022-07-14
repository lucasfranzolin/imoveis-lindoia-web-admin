import { Box, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { NavItem } from '../NavItem';

const MobileNav = ({ isOpen, routes }) => {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <Box pt={2} pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={2}>
                {routes.map((route) => (
                    <NavItem
                        key={route}
                        href={route.href}
                        isActive={router.asPath.startsWith(route.href)}
                    >
                        {route.label}
                    </NavItem>
                ))}
            </Stack>
        </Box>
    );
};

MobileNav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export { MobileNav };
