import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function BrandLogo({
    inverted = false,
    compact = false,
    className = '',
}: {
    inverted?: boolean;
    compact?: boolean;
    className?: string;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            to="/"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                'group inline-flex items-center gap-1.5 font-mono select-none transition-all duration-300',
                className,
            )}
            aria-label="quilab.co — Consorcio de desarrollo de software"
        >
            {/* Opening Bracket < */}
            <span
                className={cn(
                    'text-xl font-bold transition-all duration-300 transform inline-block',
                    hovered
                        ? '-translate-x-1 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]'
                        : inverted
                          ? 'text-sky-300/80'
                          : 'text-sky-600',
                )}
            >
                &lt;
            </span>

            {/* Core Domain Brand */}
            <span
                className={cn(
                    'font-display font-bold tracking-tight text-lg transition-colors duration-300',
                    inverted ? 'text-white' : 'text-primary',
                )}
            >
                quilab
                <span
                    className={cn(
                        'transition-colors duration-300 font-semibold',
                        hovered
                            ? 'text-sky-400'
                            : inverted
                              ? 'text-sky-300/90'
                              : 'text-sky-600',
                    )}
                >
                    .co
                </span>
            </span>

            {/* Closing Bracket > */}
            <span
                className={cn(
                    'text-xl font-bold transition-all duration-300 transform inline-block',
                    hovered
                        ? 'translate-x-1 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]'
                        : inverted
                          ? 'text-sky-300/80'
                          : 'text-sky-600',
                )}
            >
                &gt;
            </span>
        </Link>
    );
}
