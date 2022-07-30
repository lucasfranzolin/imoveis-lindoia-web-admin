import { useRouter } from 'next/router';

import { PropertyEdit } from '../../../components/PropertyEdit';
import { AppShell } from '../../../layouts/AppShell';

export default function PropertyEditPage() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return null;

    return (
        <AppShell>
            <PropertyEdit id={id} />
        </AppShell>
    );
}
