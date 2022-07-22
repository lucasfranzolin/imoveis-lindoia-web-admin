import { Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const Logo = () => {
    return (
        <NextLink href="/" passHref>
            <Link
                textTransform="uppercase"
                display="flex"
                _hover={{
                    textDecoration: 'none',
                }}
                title="Voltar ao inicio"
            >
                <Text fontWeight="bold">imoveis</Text>
                <Text textColor="teal.500">lindoia</Text>
            </Link>
        </NextLink>
    );
};

export { Logo };
