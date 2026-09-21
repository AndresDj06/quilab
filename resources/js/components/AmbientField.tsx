import { cn } from '@/lib/utils';

export function AmbientField({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
    return (
        <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
            <span className={cn('ambient-orb ambient-gold float-slow pulse-glow h-[28rem] w-[28rem] -left-24 -top-24', tone === 'light' && 'opacity-70')} />
            <span className="ambient-orb ambient-teal float-slower pulse-glow right-[-8rem] top-24 h-[24rem] w-[24rem]" />
            <span className="ambient-orb ambient-violet float-slow bottom-[-6rem] left-1/3 h-[22rem] w-[22rem] opacity-70" />
        </div>
    );
}
