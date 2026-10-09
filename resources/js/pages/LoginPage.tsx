import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';
import { Seo } from '@/components/Seo';
import { PlasmaWave } from '@/components/PlasmaWave';
import { loginErrorMessage, useAuth } from '@/context/AuthContext';
import { ShieldCheck, Terminal, ArrowLeft, Lock } from 'lucide-react';

export default function LoginPage() {
    const { user, loading, login } = useAuth();
    const { config } = useCreative();
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
        <div className="grid min-h-screen bg-[#050610] lg:grid-cols-12 text-slate-100 overflow-hidden">
            <Seo title="Acceso al Consorcio — QUILAB" />

            {/* Left Side: Interactive PlasmaWave WebGL Experience */}
            <div className="relative hidden lg:col-span-7 xl:col-span-7 lg:flex lg:flex-col lg:justify-between p-10 xl:p-14 overflow-hidden border-r border-white/10 bg-[#050610]">
                {/* Plasma Wave Canvas */}
                <div className="absolute inset-0 z-0">
                    <PlasmaWave
                        colors={[config.plasmaWave.color1, config.plasmaWave.color2]}
                        speed1={config.plasmaWave.warpSpeed * 0.025}
                        speed2={config.plasmaWave.timeSpeed * 0.01}
                        focalLength={config.plasmaWave.zoom}
                        bend1={config.plasmaWave.warpStrength}
                        bend2={config.plasmaWave.blendSoftness * 10}
                        dir2={1.0}
                        rotationDeg={config.plasmaWave.rotationAmount}
                        lightMode={config.plasmaWave.lightMode}
                    />

                    {/* Atmospheric gradient vignettes */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050610] via-transparent to-[#050610]/70" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050610]/80" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,6,16,0.6)_100%)]" />
                </div>

                {/* Top Overlay Bar */}
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/70 px-4 py-1.5 font-mono text-[11px] text-cyan-300 backdrop-blur-md shadow-lg shadow-black/40">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                        </span>
                        <span className="font-semibold tracking-wider">QUILAB // CORE ACCESS</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                        <span className="hidden xl:inline text-white/30">|</span>
                        <span className="flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-950/50 px-2.5 py-1 text-[11px] backdrop-blur-sm">
                            <Terminal size={12} className="text-purple-400" />
                            <span>v2026.1</span>
                        </span>
                    </div>
                </div>

                {/* Center / Ambient HUD Details */}
                <div className="relative z-10 my-auto py-12 max-w-lg">
                    <div className="inline-flex items-center gap-2 rounded-md border border-purple-500/30 bg-purple-950/30 px-3 py-1 font-mono text-xs uppercase tracking-widest text-purple-300 backdrop-blur-md mb-6">
                        <ShieldCheck size={14} className="text-purple-400" />
                        <span>Consorcio Privado de Ingeniería</span>
                    </div>

                    <h1 className="font-display text-4xl xl:text-6xl font-bold tracking-tight text-white leading-tight">
                        El archivo y la arquitectura, en privado.
                    </h1>

                    <p className="mt-5 text-sm xl:text-base leading-relaxed text-slate-300/85 font-sans">
                        Consola restringida para la orquestación de proyectos, escuadras técnicas, gobernanza de código y métricas operativas de QUILAB.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                        <div className="space-y-1">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Protocolo</span>
                            <p className="font-mono text-xs font-medium text-white flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Sesión Aislada & TLS 1.3
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Gobernanza</span>
                            <p className="font-mono text-xs font-medium text-white">
                                Role-Based Access Control
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Status Footnote */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
                    <span>© 2026 QUILAB Consortium</span>
                    <span className="text-[11px] text-slate-500">ID: SEC_POD_ALPHA</span>
                </div>
            </div>

            {/* Right Side: Authentication Terminal */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between bg-white px-6 sm:px-12 py-10 lg:py-14 text-slate-900">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-slate-900 transition-colors"
                        title="Volver al portal público"
                    >
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                        <span>Portal Público</span>
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Lock size={12} className="text-emerald-600" />
                        <span>Autenticación</span>
                    </div>
                </div>

                <div className="my-auto w-full max-w-sm mx-auto py-8">
                    <div className="mb-8">
                        <BrandLogo />
                        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-950">
                            Iniciar Sesión
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Ingresa con las credenciales asignadas a tu escuadra.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <Field label="Correo Institucional">
                            <Input
                                name="email"
                                type="email"
                                autoComplete="username"
                                placeholder="usuario@quilab.dev"
                                required
                                className="bg-slate-50 border-slate-300 focus:bg-white transition-all text-sm"
                            />
                        </Field>

                        <Field label="Contraseña de Acceso">
                            <Input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••••••"
                                required
                                className="bg-slate-50 border-slate-300 focus:bg-white transition-all text-sm"
                            />
                        </Field>

                        {error ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 animate-in fade-in duration-200">
                                <span className="font-semibold">Error de autenticación:</span> {error}
                            </div>
                        ) : null}

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#050610] hover:bg-slate-900 text-white font-mono text-xs uppercase tracking-[0.16em] h-11 transition-all shadow-md active:scale-[0.99]"
                        >
                            {submitting ? 'Verificando firma…' : 'Acceder a la Consola'}
                        </Button>
                    </form>
                </div>

                <div className="text-center font-mono text-[11px] text-slate-400 border-t border-slate-100 pt-4">
                    Acceso exclusivo para ingenieros y editores autorizados.
                </div>
            </div>
        </div>
    );
}
