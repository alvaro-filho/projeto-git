import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Building2, Chrome, Palette, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/AuthContext"; // Importa o hook de autenticação
import { useNavigate } from "@tanstack/react-router"; // Importa navegação para redirecionar

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Ateliê Studio" },
      {
        name: "description",
        content:
          "Acesse o Ateliê Studio: gestão de produção artística, colaboração visual em canvas e vitrine com controle de NDA.",
      },
      { property: "og:title", content: "Entrar — Ateliê Studio" },
      {
        property: "og:description",
        content: "Plataforma de gestão de produção artística para artistas e estúdios.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState("entrar");
  const [profile, setProfile] = useState<"artista" | "empresa">("artista");
  const { login } = useAuth(); // Importa a função de login
  const navigate = useNavigate(); // Importa a função de navegação
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // -----------------------------------------------------------
    // SIMULAÇÃO DE CHAMADA DE API:
    // Em produção, aqui você faria:
    // 1. Chamar POST /api/v1/auth/login com email e senha.
    // 2. Receber o { token, user } do backend.
    // 3. Chamar login(token, user) e navegar.
    // -----------------------------------------------------------
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula latência de rede

    // Simulação de sucesso para qualquer login
    const mockToken = "fake-jwt-token-12345";
    const mockUser = {
        id: 1,
        name: "Nome do Usuário",
        email: "user@example.com",
        role: "ARTIST", // Deve ser passado pelo backend
    };
    
    try {
      login(mockToken, mockUser); // Atualiza o contexto e o localStorage
      navigate({ to: "/dashboard" }); // Redireciona
    } catch (error) {
      console.error("Falha ao logar:", error);
      // Exibir mensagem de erro na UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute -top-32 -left-24 size-96 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute -right-24 -bottom-32 size-96 rounded-full bg-neon/15 blur-[120px]" />

      <div className="glass fade-up relative w-full max-w-md rounded-3xl p-7">
        <div className="flex items-center gap-3">
          <div className="gradient-primary flex size-11 items-center justify-center rounded-2xl">
            <Palette className="size-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Ateliê Studio</h1>
            <p className="text-xs text-muted-foreground">Produção artística, colaboração e NDA</p>
          </div>
        </div>

        <Tabs value={mode} onValueChange={setMode} className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="entrar">Entrar</TabsTrigger>
            <TabsTrigger value="cadastro">Criar Cadastro</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-5">
          <p className="text-xs text-muted-foreground">Tipo de perfil</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <ProfileButton
              active={profile === "artista"}
              icon={User}
              label="Artista / Freelancer"
              onClick={() => setProfile("artista")}
            />
            <ProfileButton
              active={profile === "empresa"}
              icon={Building2}
              label="Empresa / Estúdio"
              onClick={() => setProfile("empresa")}
            />
          </div>
        </div>

        <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="voce@atelie.com" className="bg-white/5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" type="password" placeholder="••••••••" className="bg-white/5" />
          </div>
          <Button asChild className="gradient-primary w-full text-primary-foreground">
            <Link to="/dashboard">{mode === "entrar" ? "Entrar no ateliê" : "Criar cadastro"}</Link>
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          ou continue com
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="bg-white/5">
            <Chrome className="size-4" />
            Google
          </Button>
          <Button variant="outline" className="bg-white/5">
            <Sparkles className="size-4" />
            ArtStation
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProfileButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof User;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass rounded-xl p-3 text-left text-sm transition-colors ${
        active ? "border-primary/70 shadow-[var(--shadow-glow)]" : "text-muted-foreground"
      }`}
    >
      <Icon className={`size-4 ${active ? "text-primary" : ""}`} />
      <span className="mt-2 block leading-tight">{label}</span>
    </button>
  );
}
