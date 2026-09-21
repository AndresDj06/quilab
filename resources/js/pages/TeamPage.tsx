import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Seo } from '@/components/Seo';
import { Team } from '@/features/landing/Team';
import type { Member } from '@/types';

export default function TeamPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/public/members')
            .then((response) => setMembers(response.data.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-background pt-10">
            <Seo title="Equipo" description="Profesionales de QUILAB: ingeniería, diseño, datos y producto." />
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
                <p className="section-index">Personas</p>
                <h1 className="mt-4 max-w-3xl font-display text-5xl leading-none lg:text-7xl">El consorcio, con nombre y oficio.</h1>
            </div>
            <Team members={members} loading={loading} />
        </div>
    );
}
