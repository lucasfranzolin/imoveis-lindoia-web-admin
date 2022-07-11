import { Register } from '../client/components/Register';
import { authService } from '../server/services/auth';

export async function getServerSideProps(context) {
    try {
        await authService(context).verify();
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } catch {
        return { props: {} };
    }
}

export default Register;
