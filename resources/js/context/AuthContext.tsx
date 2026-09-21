import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, csrfCookie, resetCsrfCookie } from '@/lib/api';
import { errorMessage } from '@/lib/utils';
import type { User } from '@/types';

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        csrfCookie()
            .then(() => api.get('/auth/me'))
            .then((response) => setUser(response.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            loading,
            login: async (email, password) => {
                await csrfCookie();
                const response = await api.post('/auth/login', { email, password });
                await resetCsrfCookie();
                setUser(response.data.user);
            },
            logout: async () => {
                try {
                    await csrfCookie();
                    await api.post('/auth/logout');
                } finally {
                    setUser(null);
                }
            },
        }),
        [user, loading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export { errorMessage as loginErrorMessage };
