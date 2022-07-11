/* eslint-disable react/prop-types */
import '../client/styles/global.scss';

import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../client/contexts/auth';

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
