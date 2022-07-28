import { useState } from 'react';

export const useLogin = () => {
    const [success, setSuccess] = useState(false);

    const login = (params) => {
        console.log('login', params);
        setSuccess(true);
    };

    return [
        {
            loading: false,
            success,
            error: false,
            data: {
                accessToken: 'test123',
            },
        },
        login,
    ];
};
