import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/context/ToastContext';
import { errorMessage } from '@/lib/utils';
import type { Member, Paginated } from '@/types';

export default function AdminMembersPage() {
    const toast = useToast();
    const [page, setPage] = useState<Paginated<Member> | null>(null);
    const [q, setQ] = useState('');
    const [removeId, setRemoveId] = useState<number | null>(null);

    function load(current = 1) {
        api.get('/admin/members', { params: { q, page: current } }).then((response) => setPage(response.data));
    }

    useEffect(() => {
        load();
    }, [q]);

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="section-index">Consorcio</p>
                    <h1 className="mt-2 font-display text-4xl">Miembros</h1>
                </div>
                <Link to="/admin/miembros/nuevo" className="inline-flex h-11 items-center bg-ink px-5 text-xs uppercase tracking-[0.16em] text-white">
                    Crear miembro
                </Link>
            </div>
            <Input placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
            <DataTable headers={['Nombre', 'Rol', 'Estado', 'Proyectos', 'Acciones']} empty={!page?.data.length}>
                {page?.data.map((member) => (
                    <tr key={member.id} className="border-t border-border">
                        <td className="px-4 py-3">{member.public_name}</td>
                        <td className="px-4 py-3">{member.role_title}</td>
                        <td className="px-4 py-3">{member.status}</td>
                        <td className="px-4 py-3">{member.projects_count ?? 0}</td>
                        <td className="space-x-3 px-4 py-3 text-xs uppercase tracking-[0.12em]">
                            <Link to={`/admin/miembros/${member.id}/editar`}>Editar</Link>
                            <button type="button" className="cursor-pointer text-destructive" onClick={() => setRemoveId(member.id)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </DataTable>
            <Modal
                open={removeId !== null}
                title="Eliminar miembro"
                destructive
                confirmLabel="Eliminar"
                onClose={() => setRemoveId(null)}
                onConfirm={async () => {
                    if (!removeId) return;
                    try {
                        await api.delete(`/admin/members/${removeId}`);
                        toast.push('Miembro eliminado');
                        setRemoveId(null);
                        load();
                    } catch (error) {
                        toast.push(errorMessage(error), 'error');
                    }
                }}
            >
                Se desvinculará de todos los proyectos.
            </Modal>
        </div>
    );
}
