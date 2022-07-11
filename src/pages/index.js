import { Home } from '../client/components/Home';
import { AppShell } from '../client/layouts/AppShell';
import { checkSSRSession } from '../server/utils/session';

export async function getServerSideProps(context) {
    return await checkSSRSession(context);
}

export default function HomePage() {
    return (
        <AppShell>
            <Home />;
        </AppShell>
    );
}
