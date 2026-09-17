// art-hub-canvas/src/lib/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/components/ui/user'; // Assumindo que o componente User está em components/ui/user.tsx

// Definindo o tipo de contexto
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
    initialToken?: string;
    initialUser?: User;
}

/**
 * Provedor de Contexto para gerenciar o estado de autenticação global.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialToken, initialUser }) => {
    const [user, setUser] = useState<User | null>(initialUser || null);
    const [token, setToken] = useState<string | null>(initialToken);
    const [isLoading, setIsLoading] = useState(true);

    // Simulação de carregamento de token persistente ao montar o componente
    useEffect(() => {
        // Em um ambiente real, você leria o token de localStorage ou cookies aqui.
        console.log("Verificando sessão de usuário...");
        
        // Simulação: Verifica se há um token inicial (vindo de props ou localStorage)
        if (initialToken) {
            setToken(initialToken);
            setUser(initialUser);
        } else if (typeof localStorage !== 'undefined' && localStorage.getItem('authToken')) {
            // Se estiver rodando no browser e houver um token, carregar o usuário.
            const storedToken = localStorage.getItem('authToken');
            setToken(storedToken);
            // Em um app real, aqui seria uma chamada de API para validar o token e obter o user.
            // Por enquanto, vamos simular que o usuário é carregado com base no token.
            console.log("Token encontrado no localStorage. Carregando dados do usuário...");
            // setUser(fakeUserFromToken(storedToken)); 
        }
        
        // Simula um pequeno atraso de rede para carregar o estado inicial
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, [initialToken, initialUser]);

    // Função de login
    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('authToken', token);
    };

    // Função de logout
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
    };

    // Força o re-render e retorna o valor do contexto
    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;