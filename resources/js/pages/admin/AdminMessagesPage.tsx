import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/ui/modal';
import type { ContactMessage, Paginated } from '@/types';

export default function AdminMessagesPage() {
    const [page, setPage] = useState<Paginated<ContactMessage> | null>(null);
    const [current, setCurrent] = useState<ContactMessage | null>(null);

    function load() {
        api.get('/admin/messages').then((response) => setPage(response.data));
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <p className="section-index">Entrada</p>
                <h1 className="mt-2 font-display text-4xl">Mensajes</h1>
            </div>
            <DataTable headers={['Nombre', 'Empresa', 'Tipo', 'Estado', 'Fecha']} empty={!page?.data.length}>
                {page?.data.map((message) => (
                    <tr key={message.id} className="cursor-pointer border-t border-border hover:bg-stone-50" onClick={async () => {
                        const response = await api.get(`/admin/messages/${message.id}`);
                        setCurrent(response.data.message);
                        load();
                    }}>
                        <td className="px-4 py-3">{message.name}</td>
                        <td className="px-4 py-3">{message.company || '—'}</td>
                        <td className="px-4 py-3">{message.project_type || '—'}</td>
                        <td className="px-4 py-3">{message.status}</td>
                        <td className="px-4 py-3">{new Date(message.created_at).toLocaleDateString('es')}</td>
                    </tr>
                ))}
            </DataTable>
            <Modal open={current !== null} title={current?.name ?? ''} onClose={() => setCurrent(null)}>
                {current ? (
                    <div className="space-y-2 text-sm text-foreground">
                        <p>{current.email}</p>
                        <p>{current.company} · {current.project_type} · {current.budget}</p>
                        <p className="leading-relaxed text-muted-foreground">{current.message}</p>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
}
