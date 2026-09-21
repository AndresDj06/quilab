import { MemberCard } from '@/components/MemberCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Member } from '@/types';

export function Team({ members, loading }: { members: Member[]; loading: boolean }) {
    const [lead, ...rest] = members;

    return (
        <section id="equipo" className="relative overflow-hidden bg-background px-5 py-24 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_0%_20%,rgba(212,160,23,0.12),transparent)]" />
            <div className="relative mx-auto max-w-6xl">
                <p className="section-index">05 / Equipo</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl leading-none lg:text-6xl">Una mesa, no una grilla de retratos.</h2>
                <div className="mt-16 space-y-16">
                    {loading ? (
                        <Skeleton className="h-[420px] w-full" />
                    ) : (
                        <>
                            {lead ? <MemberCard member={lead} featured /> : null}
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {rest.map((member, index) => (
                                    <div key={member.id} className={index === 0 ? 'md:mt-12' : index === 2 ? 'lg:mt-20' : ''}>
                                        <MemberCard member={member} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
