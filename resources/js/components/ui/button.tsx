import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 cursor-pointer rounded-full font-medium tracking-wide transition-[color,background,box-shadow,filter,border-color] duration-200 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    {
        variants: {
            variant: {
                default: 'bg-primary text-white hover:bg-[#1f1a2c]',
                accent: 'btn-gold',
                outline: 'border border-border bg-transparent text-foreground hover:border-accent hover:text-accent',
                ghost: 'text-foreground/80 hover:text-foreground',
                inverse: 'bg-white text-ink hover:bg-[#fff6e8]',
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
