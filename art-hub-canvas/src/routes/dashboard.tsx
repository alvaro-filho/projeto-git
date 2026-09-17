import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban, HardDrive, Lock, PackageCheck } from "lucide-react";

import { useAuth } from "@/lib/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { DeliveryTrendChart } from "@/components/dashboard/DashboardCharts";
import { MetricCard } from "@/components/dashboard/MetricCard";

// Tipagens
interface Project {
  id: number;
  name: string;
  slug: string;
  totalAssets: number;
}

type HeatmapData = Record<string, number>;

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Ateliê Studio" },
      {
        name: "description",
        content:
          "Acompanhe projetos ativos, entregas da semana, artes travadas por NDA e armazenamento do seu ateliê.",
      },
      { property: "og:title", content: "Dashboard — Ateliê Studio" },
      {
        property: "og:description",
        content: "Métricas de produção artística, atividade diária e tendência de entregas.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redireciona para o login se o usuário não estiver autenticado
  useEffect(() => {
    if (!user) {
      navigate({ to: "/login", replace: true });
    }
  }, [user, navigate]);

  // Fetching de Projetos (RF005)
  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return [
        { id: 101, name: "Design System V2", slug: "ds-v2", totalAssets: 150 },
        { id: 102, name: "Vitrine Cliente Alpha", slug: "alpha-showcase", totalAssets: 45 },
        { id: 103, name: "Campanha Verão", slug: "summer-campaign", totalAssets: 220 },
      ];
    },
    enabled: Boolean(user?.id),
  });

  // Fetching do Mapa de Calor (RF002)
  const { data: heatmap, isLoading: isLoadingHeatmap } = useQuery<HeatmapData>({
    queryKey: ["heatmap", user?.id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        "2024-06-01": 5,
        "2024-06-15": 12,
        "2024-06-28": 8,
      };
    },
    enabled: Boolean(user?.id),
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        Redirecionando para o login...
      </div>
    );
  }

  if (isLoadingProjects || isLoadingHeatmap) {
    return (
      <AppLayout title="Dashboard" subtitle="Visão geral da produção do ateliê">
        <div className="flex items-center justify-center h-64 text-lg text-muted-foreground">
          Carregando dados do Painel de Controle...
        </div>
      </AppLayout>
    );
  }

  const projectsData: Project[] = projects || [];

  const totalAssetsCount = projectsData.reduce(
    (acc: number, p: Project) => acc + p.totalAssets,
    0
  );

  return (
    <AppLayout title="Dashboard" subtitle="Visão geral da produção do ateliê">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Projetos ativos"
          value={projectsData.length.toString()}
          hint={`Total de ${totalAssetsCount} assets`}
          icon={FolderKanban}
        />
        <MetricCard
          label="Entregas na semana"
          value="37"
          hint="12 aguardando revisão do cliente"
          icon={PackageCheck}
          tone="neon"
        />
        <MetricCard
          label="Artes travadas por NDA"
          value="13"
          hint="5 elegíveis para liberação"
          icon={Lock}
          tone="destructive"
        />
        <MetricCard
          label="Armazenamento usado"
          value="412 GB"
          hint="de 600 GB disponíveis"
          icon={HardDrive}
          progress={69}
        />
      </div>

      <div className="mt-4">
        <ActivityHeatmap />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DeliveryTrendChart />
        <ProjectList projects={projectsData} />
      </div>
    </AppLayout>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="glass p-6 rounded-xl border border-border">
      <h3 className="text-lg font-semibold mb-4">Projetos em Destaque (RF005)</h3>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border-b pb-3 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-primary">{project.name}</p>
              <span className="text-xs text-muted-foreground">{project.slug}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{project.totalAssets} assets cadastrados.</p>
            <button className="text-xs text-primary mt-1 hover:underline">Ver Dashboard &gt;</button>
          </div>
        ))}
      </div>
    </div>
  );
}