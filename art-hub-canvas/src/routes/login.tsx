import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, Chrome, Palette, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/AuthContext";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Chamando a função de login do contexto, que agora contém toda a lógica de fetch, validação e tratamento de erro.
      await login(email, password);
      
      // Se o login for bem-sucedido (e não lançar exceção), o contexto já atualizou o estado.
      console.log("Login bem-sucedido. Redirecionando...");
      
      // Redireciona para a página principal do dashboard
      navigate({ to: "/dashboard" });
    } catch (error) {
      // O erro já é tratado e lançado pela função de contexto.
      console.error("Falha na autenticação com o servidor:", error);
      // Aqui você pode adicionar uma notificação de erro visual para o usuário
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

        <form className="mt-5 space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="voce@atelie.com"
              className="bg-white/5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              className="bg-white/5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="gradient-primary w-full text-primary-foreground"
          >
            {isLoading
              ? "Autenticando..."
              : mode === "entrar"
              ? "Entrar no ateliê"
              : "Criar cadastro"}
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