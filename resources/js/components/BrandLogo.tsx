import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function BrandLogo({ inverted = false, compact = false }: { inverted?: boolean; compact?: boolean }) {
    return (
        <Link to="/" className="group flex items-center gap-3" aria-label="QUILAB, inicio">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-current/40">
                <span className="absolute inset-0 bg-gradient-to-br from-gold/30 via-transparent to-teal/30 opacity-80" />
                <span className={cn('absolute left-1 top-1 h-2 w-2 rounded-[2px]', inverted ? 'bg-white' : 'bg-foreground')} />
                <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-[2px] bg-accent" />
            </span>
            {!compact ? (
                <span className={cn('text-sm font-semibold tracking-[0.28em]', inverted ? 'text-white' : 'text-foreground')}>
                    QUILAB
                </span>
            ) : null}
        </Link>
    );
}
