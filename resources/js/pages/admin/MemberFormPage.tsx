import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useToast } from '@/context/ToastContext';
import { errorMessage } from '@/lib/utils';
import type { Member, Technology } from '@/types';
import { CheckCircle2, FolderGit2, Layers } from 'lucide-react';

type ProjectOption = {
    id: number;
    name: string;
    title: string;
    year?: number;
};

export default function MemberFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [member, setMember] = useState<Member | null>(null);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [availableProjects, setAvailableProjects] = useState<ProjectOption[]>([]);
    const [techIds, setTechIds] = useState<number[]>([]);
    const [projectIds, setProjectIds] = useState<number[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/admin/meta').then((response) => {
            setTechnologies(response.data.technologies ?? []);
            if (response.data.projects) {
                setAvailableProjects(response.data.projects);
            }
        });
    }, []);

    useEffect(() => {
        if (!id) return;
        api.get(`/admin/members/${id}`).then((response) => {
            const item: Member = response.data.member;
            setMember(item);
            setTechIds(item.technologies?.map((tech) => tech.id) ?? []);
            setProjectIds(item.projects?.map((proj) => proj.id) ?? []);
        });
    }, [id]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const payload = new FormData(event.currentTarget);
        payload.set('technologies', JSON.stringify(techIds));
        payload.set('projects', JSON.stringify(projectIds.map((pid) => ({ id: pid }))));
        setSaving(true);
        try {
            const url = id ? `/admin/members/${id}` : '/admin/members';
            const response = await api.post(url, payload);
            toast.push(id ? 'Miembro actualizado correctamente' : 'Miembro creado correctamente');
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

    const projectsCount = projectIds.length;

    return (
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-4xl">{id ? member?.public_name ?? 'Miembro' : 'Crear miembro'}</h1>
                    {id ? (
                        <p className="mt-1 font-mono text-xs text-sky-600 font-semibold">
                            Registrado en el consorcio con {projectsCount} {projectsCount === 1 ? 'proyecto' : 'proyectos'}
                        </p>
                    ) : null}
                </div>
                <Link to="/admin/miembros" className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
                    Volver
                </Link>
            </div>

            {/* Información personal y profesional */}
            <section className="space-y-4 border border-border bg-white p-6 rounded-xl shadow-xs">
                <p className="section-index text-sky-600">01 // Información profesional</p>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nombre">
                        <Input name="first_name" required defaultValue={member?.first_name} />
                    </Field>
                    <Field label="Apellido">
                        <Input name="last_name" required defaultValue={member?.last_name} />
                    </Field>
                </div>
                <Field label="Nombre público (visible en cards del consorcio)">
                    <Input name="public_name" defaultValue={member?.public_name} placeholder="Ej. Carlos Pérez" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Cargo / Rol Principal">
                        <Input name="role_title" required defaultValue={member?.role_title} placeholder="Ej. Senior Cloud Architect" />
                    </Field>
                    <Field label="Especialidad técnica">
                        <Input name="specialty" defaultValue={member?.specialty ?? ''} placeholder="Ej. Kubernetes · Go · Distributed Systems" />
                    </Field>
                </div>
                <Field label="Biografía y trayectoria">
                    <Textarea name="bio" defaultValue={member?.bio ?? ''} placeholder="Describe la experiencia técnica y rol en el consorcio..." />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email corporativo">
                        <Input name="email" type="email" defaultValue={member?.email ?? ''} />
                    </Field>
                    <Field label="Ubicación / Ciudad">
                        <Input name="location" defaultValue={member?.location ?? ''} placeholder="Ej. Bogotá, Colombia" />
                    </Field>
                    <Field label="Perfil de LinkedIn (URL)">
                        <Input name="linkedin" defaultValue={member?.linkedin ?? ''} placeholder="https://linkedin.com/in/..." />
                    </Field>
                    <Field label="Perfil de GitHub (URL)">
                        <Input name="github" defaultValue={member?.github ?? ''} placeholder="https://github.com/..." />
                    </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Estado en el consorcio">
                        <Select name="status" defaultValue={member?.status ?? 'active'}>
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </Select>
                    </Field>
                    <Field label="Foto de perfil">
                        <Input name="photo" type="file" accept="image/*" />
                    </Field>
                </div>
            </section>

            {/* Asignación de Proyectos (determina dinámicamente "X proyectos") */}
            <section className="space-y-4 border border-border bg-white p-6 rounded-xl shadow-xs">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="section-index text-sky-600">02 // Proyectos Asignados</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Selecciona los proyectos en los que este integrante ha participado. El indicador público refleja automáticamente esta cifra.
                        </p>
                    </div>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                        {projectsCount} {projectsCount === 1 ? 'proyecto' : 'proyectos'}
                    </span>
                </div>

                {availableProjects.length > 0 ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {availableProjects.map((proj) => {
                            const isAssigned = projectIds.includes(proj.id);
                            return (
                                <div
                                    key={proj.id}
                                    onClick={() =>
                                        setProjectIds((current) =>
                                            isAssigned ? current.filter((id) => id !== proj.id) : [...current, proj.id],
                                        )
                                    }
                                    className={`group flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                                        isAssigned
                                            ? 'border-sky-500 bg-sky-50/60 shadow-xs'
                                            : 'border-border bg-slate-50/50 hover:bg-white hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                                                isAssigned ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                                            }`}
                                        >
                                            <FolderGit2 size={16} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-foreground truncate">{proj.name}</p>
                                            <p className="text-[11px] text-muted-foreground truncate">{proj.title}</p>
                                        </div>
                                    </div>

                                    <div className="shrink-0 pl-2">
                                        {isAssigned ? (
                                            <CheckCircle2 size={18} className="text-sky-600" />
                                        ) : (
                                            <div className="h-4 w-4 rounded-full border border-slate-300" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground">No hay proyectos registrados en el catálogo aún.</p>
                )}
            </section>

            {/* Tecnologías dominadas */}
            <section className="space-y-4 border border-border bg-white p-6 rounded-xl shadow-xs">
                <p className="section-index text-sky-600">03 // Stack & Tecnologías</p>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => {
                        const active = techIds.includes(tech.id);
                        return (
                            <button
                                key={tech.id}
                                type="button"
                                className={`cursor-pointer rounded-md border px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                                    active
                                        ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                                        : 'border-border bg-slate-50 text-slate-700 hover:bg-slate-100'
                                }`}
                                onClick={() => setTechIds((current) => (active ? current.filter((value) => value !== tech.id) : [...current, tech.id]))}
                            >
                                {tech.name}
                            </button>
                        );
                    })}
                </div>
            </section>

            <Button type="submit" disabled={saving} className="w-full sm:w-auto uppercase tracking-[0.16em] py-3 px-8">
                {saving ? 'Guardando cambios…' : 'Guardar Información del Miembro'}
            </Button>
        </form>
    );
}
