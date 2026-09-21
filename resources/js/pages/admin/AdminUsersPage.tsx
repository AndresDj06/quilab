import { useEffect, useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/context/ToastContext';
import { errorMessage } from '@/lib/utils';
import type { Paginated, User } from '@/types';

export default function AdminUsersPage() {
    const toast = useToast();
    const [page, setPage] = useState<Paginated<User> | null>(null);
    const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
    const [removeId, setRemoveId] = useState<number | null>(null);

    function load() {
        api.get('/admin/users').then((response) => setPage(response.data)).catch((error) => toast.push(errorMessage(error), 'error'));
    }

    useEffect(() => {
        load();
        api.get('/admin/meta').then((response) => setRoles(response.data.roles));
    }, []);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        try {
            await api.post('/admin/users', data);
            toast.push('Usuario creado');
            form.reset();
            load();
        } catch (error) {
            toast.push(errorMessage(error), 'error');
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <p className="section-index">Acceso</p>
                <h1 className="mt-2 font-display text-4xl">Usuarios</h1>
            </div>
            <form onSubmit={onSubmit} className="grid gap-4 border border-border bg-white p-6 lg:grid-cols-2">
                <Field label="Nombre">
                    <Input name="name" required />
                </Field>
                <Field label="Email">
                    <Input name="email" type="email" required />
                </Field>
                <Field label="Contraseña">
                    <Input name="password" type="password" required minLength={8} />
                </Field>
                <Field label="Confirmar">
                    <Input name="password_confirmation" type="password" required />
                </Field>
                <Field label="Rol">
                    <Select name="role" defaultValue="editor">
                        {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </Select>
                </Field>
                <Field label="Estado">
                    <Select name="status" defaultValue="active">
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </Select>
                </Field>
                <div className="lg:col-span-2">
                    <Button type="submit" className="uppercase tracking-[0.16em]">
                        Crear usuario
                    </Button>
                </div>
            </form>
            <DataTable headers={['Nombre', 'Email', 'Rol', 'Estado', '']} empty={!page?.data.length}>
                {page?.data.map((user) => (
                    <tr key={user.id} className="border-t border-border">
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.role_label}</td>
                        <td className="px-4 py-3">{user.status}</td>
                        <td className="px-4 py-3 text-right">
                            <button type="button" className="cursor-pointer text-xs uppercase text-destructive" onClick={() => setRemoveId(user.id)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </DataTable>
            <Modal
                open={removeId !== null}
                title="Eliminar usuario"
                destructive
                confirmLabel="Eliminar"
                onClose={() => setRemoveId(null)}
                onConfirm={async () => {
                    if (!removeId) return;
                    try {
                        await api.delete(`/admin/users/${removeId}`);
                        toast.push('Usuario eliminado');
                        setRemoveId(null);
                        load();
                    } catch (error) {
                        toast.push(errorMessage(error), 'error');
                    }
                }}
            >
                El usuario perderá el acceso al panel.
            </Modal>
        </div>
    );
}
