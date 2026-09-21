import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
    return <div className={cn('animate-pulse bg-muted', className)} aria-hidden="true" />;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
    return (
        <div className="border border-dashed border-border px-6 py-16 text-center">
            <p className="section-index">Sin resultados</p>
            <h3 className="mt-3 font-display text-3xl">{title}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{body}</p>
            {action ? <div className="mt-6">{action}</div> : null}
        </div>
    );
}
