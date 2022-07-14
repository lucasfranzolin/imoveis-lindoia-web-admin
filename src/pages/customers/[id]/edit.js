import { useRouter } from 'next/router';

import { CustomerEdit } from '../../../components/CustomerEdit';
import { AppShell } from '../../../layouts/AppShell';

export default function CustomerEditPage() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return null;

    return (
        <AppShell>
            <CustomerEdit id={id} />
        </AppShell>
    );
}
