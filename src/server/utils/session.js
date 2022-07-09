import { authService } from '../services/auth';

export async function checkSSRSession(context) {
    try {
        await authService(context).verify();
        return {
            props: {},
        };
    } catch {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}
