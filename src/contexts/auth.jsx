import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createContext } from 'react';

import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { STORAGE_ITEM_ACCESS_TOKEN } from '../utils/http';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [
        { loading: loggingIn, error: loginError, success: loginOk, data },
        login,
    ] = useLogin();
    const [
        { loading: registering, error: registerError, success: registerOk },
        register,
    ] = useRegister();

    useUpdateEffect(() => {
        if (loginOk) {
            localStorage.setItem(STORAGE_ITEM_ACCESS_TOKEN, data.accessToken);
            router.push('/');
        }
    }, [loginOk, data]);

    useUpdateEffect(() => {
        if (registerOk) {
            router.push('/login');
        }
    }, [registerOk]);

    return (
        <AuthContext.Provider
            value={{
                error: loginError || registerError,
                loading: loggingIn || registering,
                register,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider };
