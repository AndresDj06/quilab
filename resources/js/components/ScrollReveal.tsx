import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    distance?: number;
    threshold?: number;
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = 'up',
    duration = 750,
    distance = 28,
    threshold = 0.12,
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        // If prefers-reduced-motion is active, reveal immediately
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    const getInitialTransform = () => {
        switch (direction) {
            case 'up':
                return `translate3d(0, ${distance}px, 0)`;
            case 'down':
                return `translate3d(0, -${distance}px, 0)`;
            case 'left':
                return `translate3d(${distance}px, 0, 0)`;
            case 'right':
                return `translate3d(-${distance}px, 0, 0)`;
            case 'none':
            default:
                return 'translate3d(0, 0, 0)';
        }
    };

    return (
        <div
            ref={elementRef}
            className={cn('transform-gpu will-change-[transform,opacity]', className)}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : `${getInitialTransform()} scale(0.985)`,
                transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default ScrollReveal;
