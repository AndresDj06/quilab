import { useEffect, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export function Modal({
    open,
    title,
    children,
    onClose,
    onConfirm,
    confirmLabel = 'Confirmar',
    destructive = false,
}: {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    confirmLabel?: string;
    destructive?: boolean;
}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <button type="button" className="absolute inset-0 cursor-pointer bg-ink/50 backdrop-blur-md" aria-label="Cerrar" onClick={onClose} />
            <div role="dialog" aria-modal="true" className="glass-panel relative w-full max-w-md rounded-3xl p-6">
                <h2 className="font-display text-2xl">{title}</h2>
                <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                    {onConfirm ? (
                        <Button variant={destructive ? 'destructive' : 'default'} onClick={onConfirm}>
                            {confirmLabel}
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
