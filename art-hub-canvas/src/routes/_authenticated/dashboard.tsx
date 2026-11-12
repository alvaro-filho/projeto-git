import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban, HardDrive, Lock, PackageCheck } from "lucide-react";

import { useAuth } from "@/lib/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { DeliveryTrendChart, type DeliveryTrendData } from "@/components/dashboard/DashboardCharts";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { fetchActivityHeatmap } from "@/lib/activity-api";
import { fetchProjects, type DashboardProject } from "@/lib/dashboard-api";

// Tipagens
export const Route = createFileRoute("/_authenticated/dashboard")({
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
  const [category, setCategory] = useState<"ALL" | DashboardProject["category"]>("ALL");

  // Fetching de Projetos (RF005)
  const { data: projects, isLoading: isLoadingProjects } = useQuery<DashboardProject[]>({
    queryKey: ["projects", user?.id],
    queryFn: fetchProjects,
    enabled: Boolean(user?.id),
  });

  // Fetching do Mapa de Calor (RF002)
  const { data: heatmap, isLoading: isLoadingHeatmap } = useQuery({
    queryKey: ["heatmap", user?.id],
    queryFn: fetchActivityHeatmap,
    enabled: Boolean(user?.id),
  });

  const { data: deliveryTrend, isLoading: isLoadingDeliveryTrend } = useQuery<DeliveryTrendData[]>({
    queryKey: ["delivery-trend", user?.id],
    queryFn: async () => {
      if (typeof window === "undefined") return [];
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/api/v1/activity/delivery-trend", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error("Não foi possível carregar a tendência de entregas.");
      return (await response.json()) as DeliveryTrendData[];
    },
    enabled: Boolean(user?.id),
  });

  if (isLoadingProjects || isLoadingHeatmap || isLoadingDeliveryTrend) {
    return (
      <AppLayout title="Dashboard" subtitle="Visão geral da produção do ateliê">
        <div className="flex items-center justify-center h-64 text-lg text-muted-foreground">
          Carregando dados do Painel de Controle...
        </div>
      </AppLayout>
    );
  }

  const projectsData: DashboardProject[] = projects || [];
  const heatmapData = (heatmap || []).reduce<Record<string, number>>((result, item) => {
    result[item.date] = item.count;
    return result;
  }, {});

  const latestTrend = deliveryTrend?.at(-1);
  const filteredProjects =
    category === "ALL" ? projectsData : projectsData.filter((project) => project.category === category);

  return (
    <AppLayout title="Dashboard" subtitle="Visão geral da produção do ateliê">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Projetos ativos"
          value={projectsData.length.toString()}
          hint="Dados sincronizados com a API"
          icon={FolderKanban}
        />
        <MetricCard
          label="Entregas na semana"
          value={String(latestTrend?.entregas ?? 0)}
          hint={`${latestTrend?.revisoes ?? 0} revisões registradas no período`}
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
        <ActivityHeatmap data={heatmapData} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DeliveryTrendChart data={deliveryTrend ?? []} />
        <ProjectList
          projects={filteredProjects}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>
    </AppLayout>
  );
}

function ProjectList({
  projects,
  category,
  onCategoryChange,
}: {
  projects: DashboardProject[];
  category: "ALL" | DashboardProject["category"];
  onCategoryChange: (category: "ALL" | DashboardProject["category"]) => void;
}) {
  return (
    <div className="glass p-6 rounded-xl border border-border">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Projetos em Destaque (RF005)</h3>
        <div className="flex flex-wrap gap-1" aria-label="Filtrar projetos">
          {([
            ["ALL", "Todos"],
            ["EMPRESA", "Empresas"],
            ["ESTUDIO", "Estúdios"],
            ["PESSOAL", "Pessoais"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onCategoryChange(value)}
              className={`rounded-md px-2 py-1 text-xs ${
                category === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center">
          <p className="text-sm font-medium">Ainda não há projetos nesta visão.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Crie um projeto ou aceite um convite para começar a acompanhar sua produção.
          </p>
          <button type="button" className="mt-4 text-xs font-medium text-primary hover:underline">
            Criar projeto
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-primary">{project.name}</p>
                <span className="text-xs text-muted-foreground">{project.slug}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {project.description || "Projeto ativo sincronizado com a API."}
              </p>
              <button className="text-xs text-primary mt-1 hover:underline">Ver Dashboard &gt;</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
