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

    // Função de login
    const login = async (email: string, password: string) => {
        // 1. Validação de parâmetros - Guard Clause
        if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
            console.error("Dados de login inválidos fornecidos. Email e senha devem ser strings não vazias.");
            throw new Error("Email e senha são obrigatórios.");
        }

        setIsLoading(true);
        try {
            console.log("Payload enviado:", { email, password }); // Log para debug

            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Corpo estritamente JSON plano: { email, password }
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Tenta ler o corpo da resposta como texto e lança um erro amigável
                const errorText = await response.text();
                let errorMessage = "Falha no login. Verifique suas credenciais ou a API.";
                
                try {
                    // Se o corpo for JSON, tenta extrair a mensagem
                    const errorData = JSON.parse(errorText);
                    if (typeof errorData.message === 'string') {
                        errorMessage = errorData.message;
                    }
                } catch (e) {
                    // Se não for JSON, usa a mensagem padrão
                    console.warn("Erro de resposta HTTP não JSON. Usando mensagem padrão.", e);
                }
                throw new Error(errorMessage);
            }

            // Sucesso (200 OK)
            const data = await response.json();
            
            // Assume que o token JWT e o usuário são retornados.
            const userFromServer = data.user as User; 
            // ATENÇÃO: Ajustar a extração do token conforme a API real.
            const token = data.token || "TOKEN_PLACEHOLDER_DEV"; 

            // 1. Salvar no LocalStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userProfile', JSON.stringify(userFromServer));

            // 2. Atualizar o estado do Contexto (Eliminando a chamada recursiva)
            setUser(userFromServer);
            setToken(token);
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            // Propaga o erro para ser tratado no componente de quem chamou o useAuth
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Função de logout
    const logout = () => {
        console.log("Realizando logout e limpando dados.");
        // Limpa o estado
        setUser(null);
        setToken(null);
        // Limpa o localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userProfile');
        // Opcional: Redirecionar o usuário para a tela de login
        // history.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;