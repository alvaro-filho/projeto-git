// art-hub-canvas/src/lib/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string | number;
  fullName?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

// Definindo o tipo de contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, username: string, email: string, password: string, role: "ARTIST" | "COMPANY") => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
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
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialToken,
  initialUser,
}) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [token, setToken] = useState<string | null>(initialToken || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userProfile");

    setToken(storedToken);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch {
        localStorage.removeItem("userProfile");
      }
    }
    setIsLoading(false);
  }, []);

  const persistSession = (data: { token?: string; user?: User }) => {
    if (!data.token || !data.user) {
      throw new Error("A resposta da API não contém uma sessão válida.");
    }

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userProfile", JSON.stringify(data.user));
    setUser(data.user);
    setToken(data.token);
  };

  const requestAuth = async (endpoint: "login" | "register", body: object) => {
    const response = await fetch(`http://localhost:8080/api/v1/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    let data: { token?: string; user?: User; message?: string } = {};
    try {
      data = responseText ? (JSON.parse(responseText) as typeof data) : {};
    } catch {
      data.message = responseText;
    }

    if (!response.ok) {
      throw new Error(data.message || "Não foi possível concluir a autenticação.");
    }

    persistSession(data);
  };

  // Função de login
  const login = async (email: string, password: string) => {
    // 1. Validação de parâmetros - Guard Clause
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      console.error(
        "Dados de login inválidos fornecidos. Email e senha devem ser strings não vazias.",
      );
      throw new Error("Email e senha são obrigatórios.");
    }

    setIsLoading(true);
    try {
      await requestAuth("login", { email, password });
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      // Propaga o erro para ser tratado no componente de quem chamou o useAuth
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullName: string,
    username: string,
    email: string,
    password: string,
    role: "ARTIST" | "COMPANY",
  ) => {
    if (!fullName.trim() || !username.trim() || !email.trim() || !password || !role) {
      throw new Error("Nome completo, usuário, e-mail, senha e perfil são obrigatórios.");
    }

    setIsLoading(true);
    try {
      await requestAuth("register", { fullName, username, email, password, role });
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    // Opcional: Redirecionar o usuário para a tela de login
    // history.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
