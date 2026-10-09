import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 cursor-pointer font-medium tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    {
        variants: {
            variant: {
                default: 'bg-primary text-white hover:bg-stone-800',
                accent: 'bg-accent text-white hover:bg-yellow-800',
                outline: 'border border-border bg-transparent text-foreground hover:border-foreground',
                ghost: 'text-foreground/80 hover:text-foreground',
                inverse: 'bg-white text-ink hover:bg-stone-100',
                destructive: 'bg-destructive text-white hover:bg-red-700',
            },
            size: {
                default: 'h-11 px-5 text-sm',
                sm: 'h-9 px-4 text-xs',
                lg: 'h-12 px-7 text-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));

Button.displayName = 'Button';
