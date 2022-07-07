/* eslint-disable react/prop-types */
import '../client/styles/global.scss';

import { AuthProvider } from '../client/contexts/auth';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
