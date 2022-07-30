import { useRouter } from 'next/router';

import { PropertyDetails } from '../../../components/PropertyDetails';
import { AppShell } from '../../../layouts/AppShell';

export default function PropertyDetailsPage() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return null;

    return (
        <AppShell>
            <PropertyDetails id={id} />
        </AppShell>
    );
}
