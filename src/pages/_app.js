/* eslint-disable react/prop-types */
import '../styles/globals.scss';

import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../contexts/auth';
import { chakraTheme } from '../styles/chakra-theme';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={chakraTheme}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
