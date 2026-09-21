import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AmbientField } from '@/components/AmbientField';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';
import { Seo } from '@/components/Seo';
import { loginErrorMessage, useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!loading && user) {
        return <Navigate to="/admin" replace />;
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setSubmitting(true);
        setError('');
        try {
            await login(String(form.get('email')), String(form.get('password')));
            navigate('/admin');
        } catch (err) {
            setError(loginErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="grid min-h-screen bg-ink lg:grid-cols-2">
            <Seo title="Acceso" />
            <div className="relative hidden overflow-hidden ink-grid lg:block">
                <AmbientField />
                <div className="absolute bottom-12 left-12 max-w-sm text-white">
                    <p className="section-index !text-teal/80">Panel</p>
                    <p className="mt-4 font-display text-5xl leading-none">
                        El archivo, <span className="text-gradient-gold">en privado</span>.
                    </p>
                </div>
            </div>
            <div className="relative flex items-center bg-background px-6 py-16">
                <form onSubmit={onSubmit} className="glass-panel mx-auto w-full max-w-sm space-y-5 rounded-[2rem] p-8">
                    <BrandLogo />
                    <h1 className="font-display text-4xl">Entrar</h1>
                    <Field label="Email">
                        <Input name="email" type="email" autoComplete="username" required />
                    </Field>
                    <Field label="Contraseña">
                        <Input name="password" type="password" autoComplete="current-password" required />
                    </Field>
                    {error ? <p className="text-sm text-destructive">{error}</p> : null}
                    <Button type="submit" variant="accent" disabled={submitting} className="w-full uppercase tracking-[0.16em]">
                        {submitting ? 'Entrando…' : 'Acceder'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
