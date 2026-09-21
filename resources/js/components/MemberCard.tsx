import { Link } from 'react-router-dom';
import type { Member } from '@/types';
import { cn } from '@/lib/utils';

export function MemberCard({ member, featured = false }: { member: Member; featured?: boolean }) {
    return (
        <article className={cn(featured ? 'grid gap-8 lg:grid-cols-12 lg:items-end' : 'glass-card space-y-4 rounded-[1.75rem] p-4')}>
            <div className={featured ? 'lg:col-span-7' : ''}>
                <div className={cn('overflow-hidden rounded-[1.4rem] bg-ink', featured ? 'aspect-[4/5] lg:aspect-[5/4]' : 'aspect-[4/5]')}>
                    {member.photo_url ? (
                        <img src={member.photo_url} alt={member.public_name} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                        <div className="grid h-full place-items-center font-display text-7xl text-gradient-gold">{member.initials}</div>
                    )}
                </div>
            </div>
            <div className={featured ? 'glass-card lg:col-span-5 rounded-[1.75rem] p-6 lg:mb-2' : 'px-1 pb-2'}>
                <p className="section-index">{member.role_title}</p>
                <h3 className={featured ? 'mt-3 font-display text-5xl leading-none' : 'mt-2 font-display text-3xl leading-none'}>
                    {member.public_name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{member.specialty}</p>
                {featured && member.bio ? <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{member.bio}</p> : null}
                <div className="mt-4 flex flex-wrap gap-4 text-xs tracking-[0.14em] uppercase">
                    {member.linkedin ? (
                        <a href={member.linkedin} className="hover:text-accent" target="_blank" rel="noreferrer">
                            LinkedIn
                        </a>
                    ) : null}
                    {member.github ? (
                        <a href={member.github} className="hover:text-accent" target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                    ) : null}
                    <Link to="/proyectos" className="text-muted-foreground">
                        {member.projects_count ?? member.projects?.length ?? 0} proyectos
                    </Link>
                </div>
            </div>
        </article>
    );
}
