/* eslint-disable react/prop-types */
import '../styles/globals.scss';

import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../contexts/auth';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
