import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useToast } from '@/context/ToastContext';
import { errorMessage } from '@/lib/utils';
import type { Member, Technology } from '@/types';

export default function MemberFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [member, setMember] = useState<Member | null>(null);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [techIds, setTechIds] = useState<number[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/admin/meta').then((response) => setTechnologies(response.data.technologies));
    }, []);

    useEffect(() => {
        if (!id) return;
        api.get(`/admin/members/${id}`).then((response) => {
            const item: Member = response.data.member;
            setMember(item);
            setTechIds(item.technologies?.map((tech) => tech.id) ?? []);
        });
    }, [id]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const payload = new FormData(event.currentTarget);
        payload.set('technologies', JSON.stringify(techIds));
        setSaving(true);
        try {
            const url = id ? `/admin/members/${id}` : '/admin/members';
            const response = await api.post(url, payload);
            toast.push(id ? 'Miembro actualizado' : 'Miembro creado');
            navigate(`/admin/miembros/${response.data.member.id}/editar`);
        } catch (error) {
            toast.push(errorMessage(error), 'error');
        } finally {
            setSaving(false);
        }
    }

    if (id && !member) {
        return <p className="text-sm text-muted-foreground">Cargando miembro…</p>;
    }

    return (
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="font-display text-4xl">{id ? member?.public_name ?? 'Miembro' : 'Crear miembro'}</h1>
                <Link to="/admin/miembros" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Volver
                </Link>
            </div>
            <section className="space-y-4 border border-border bg-white p-6">
                <p className="section-index">Información profesional</p>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nombre">
                        <Input name="first_name" required defaultValue={member?.first_name} />
                    </Field>
                    <Field label="Apellido">
                        <Input name="last_name" required defaultValue={member?.last_name} />
                    </Field>
                </div>
                <Field label="Nombre público">
                    <Input name="public_name" defaultValue={member?.public_name} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Cargo">
                        <Input name="role_title" required defaultValue={member?.role_title} />
                    </Field>
                    <Field label="Especialidad">
                        <Input name="specialty" defaultValue={member?.specialty ?? ''} />
                    </Field>
                </div>
                <Field label="Biografía">
                    <Textarea name="bio" defaultValue={member?.bio ?? ''} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email">
                        <Input name="email" type="email" defaultValue={member?.email ?? ''} />
                    </Field>
                    <Field label="Ubicación">
                        <Input name="location" defaultValue={member?.location ?? ''} />
                    </Field>
                    <Field label="LinkedIn">
                        <Input name="linkedin" defaultValue={member?.linkedin ?? ''} />
                    </Field>
                    <Field label="GitHub">
                        <Input name="github" defaultValue={member?.github ?? ''} />
                    </Field>
                </div>
                <Field label="Estado">
                    <Select name="status" defaultValue={member?.status ?? 'active'}>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </Select>
                </Field>
                <Field label="Foto">
                    <Input name="photo" type="file" accept="image/*" />
                </Field>
            </section>
            <section className="space-y-4 border border-border bg-white p-6">
                <p className="section-index">Tecnologías</p>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => {
                        const active = techIds.includes(tech.id);
                        return (
                            <button
                                key={tech.id}
                                type="button"
                                className={`cursor-pointer border px-3 py-1 text-xs uppercase tracking-[0.12em] ${active ? 'border-ink bg-ink text-white' : 'border-border'}`}
                                onClick={() => setTechIds((current) => (active ? current.filter((value) => value !== tech.id) : [...current, tech.id]))}
                            >
                                {tech.name}
                            </button>
                        );
                    })}
                </div>
            </section>
            {member?.projects?.length ? (
                <section className="border border-border bg-white p-6">
                    <p className="section-index">Proyectos asociados</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        {member.projects.map((project) => (
                            <li key={project.id}>
                                <Link to={`/admin/proyectos/${project.id}/editar`}>{project.name}</Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
            <Button type="submit" disabled={saving} className="uppercase tracking-[0.16em]">
                {saving ? 'Guardando…' : 'Guardar'}
            </Button>
        </form>
    );
}
