import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type Toast = { id: number; title: string; tone?: 'default' | 'error' };

type ToastContextValue = {
    push: (title: string, tone?: Toast['tone']) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Toast[]>([]);

    const push = useCallback((title: string, tone: Toast['tone'] = 'default') => {
        const id = Date.now() + Math.random();
        setItems((current) => [...current, { id, title, tone }]);
        window.setTimeout(() => {
            setItems((current) => current.filter((item) => item.id !== id));
        }, 4200);
    }, []);

    const value = useMemo(() => ({ push }), [push]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="pointer-events-none fixed bottom-6 right-6 z-[80] flex w-[min(92vw,360px)] flex-col gap-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        role="status"
                        className={
                            item.tone === 'error'
                                ? 'glass-panel rounded-2xl border-destructive/30 px-4 py-3 text-sm text-destructive'
                                : 'glass-nav-dark rounded-2xl px-4 py-3 text-sm text-white'
                        }
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}
