import { useContext } from 'react';

import { AuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';

export const Login = () => {
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        const body = {
            email: 'test@imoveislindoia.com.br',
            password: '123',
        };
        await login(body);
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <button onClick={handleLogin}>Entrar</button>
            </div>
        </div>
    );
};
