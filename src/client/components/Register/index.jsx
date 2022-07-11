import { useContext } from 'react';

import { AuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';

const Register = () => {
    const { login } = useContext(AuthContext);

    const handleSubmit = async () => {
        const body = {
            email: 'test@imoveislindoia.com.br',
            password: '123',
        };
        await login(body);
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <button onClick={handleSubmit}>Entrar</button>
            </div>
        </div>
    );
};

export { Register };
