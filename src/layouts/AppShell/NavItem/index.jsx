import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

const NavItem = ({ href, children, isActive }) => {
    return (
        <NextLink href={href} passHref>
            <Link
                px={4}
                py={1}
                rounded="md"
                _hover={
                    !isActive
                        ? {
                              textDecoration: 'none',
                              bg: 'gray.700',
                          }
                        : {}
                }
                bg={isActive ? 'gray.700' : null}
            >
                {children}
            </Link>
        </NextLink>
    );
};

NavItem.propTypes = {
    isActive: PropTypes.bool.isRequired,
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export { NavItem };
