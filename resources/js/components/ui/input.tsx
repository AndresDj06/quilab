import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(
                'h-11 w-full rounded-xl border border-border/80 bg-white/70 px-3 text-sm text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus:border-accent',
                className,
            )}
            {...props}
        />
    ),
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(
                'min-h-32 w-full rounded-xl border border-border/80 bg-white/70 px-3 py-3 text-sm text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus:border-accent',
                className,
            )}
            {...props}
        />
    ),
);
Textarea.displayName = 'Textarea';

export function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
    return (
        <label className="block space-y-2">
            <span className="section-index">{label}</span>
            {children}
            {error ? <span className="block text-xs text-destructive">{error}</span> : null}
        </label>
    );
}
