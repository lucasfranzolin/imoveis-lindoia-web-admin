import { Login } from '../client/components/Login';
import { getSession } from '../server/utils/session';

export async function getServerSideProps(context) {
    try {
        await getSession(context);
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

export default Login;
