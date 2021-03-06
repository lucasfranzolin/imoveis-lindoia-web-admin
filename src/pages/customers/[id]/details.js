import { useRouter } from 'next/router';

import { CustomerDetails } from '../../../components/CustomerDetails';
import { AppShell } from '../../../layouts/AppShell';

export default function CustomerDetailsPage() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return null;

    return (
        <AppShell>
            <CustomerDetails id={id} />
        </AppShell>
    );
}
