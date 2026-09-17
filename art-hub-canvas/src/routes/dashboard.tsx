import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, HardDrive, Lock, PackageCheck } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { DeliveryTrendChart, FilesByClientChart } from "@/components/dashboard/DashboardCharts";
import { MetricCard } from "@/components/dashboard/MetricCard";

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
  const { user } = useAuth(); // Obtém o usuário do contexto de autenticação
  const navigate = useNavigate();

  // 1. Fetching de Projetos (RF005)
  const { data: projects, isLoading: isLoadingProjects, refetch: refetchProjects } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      // Simula chamada à API: GET /api/v1/projects?userId=...
      console.log("Buscando projetos do usuário:", user?.id);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simula latência de rede
      return [
        { id: 101, name: "Design System V2", slug: "ds-v2", totalAssets: 150 },
        { id: 102, name: "Vitrine Cliente Alpha", slug: "alpha-showcase", totalAssets: 45 },
        { id: 103, name: "Campanha Verão", slug: "summer-campaign", totalAssets: 220 },
      ];
    },
    enabled: Boolean(user?.id), // Só executa se o usuário estiver logado
  });

  // 2. Fetching do Mapa de Calor (RF002)
  const { data: heatmap, isLoading: isLoadingHeatmap, refetch: refetchHeatmap } = useQuery({
    queryKey: ["heatmap", user?.id],
    queryFn: async () => {
      // Calcula o período de 30 dias
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);

      // Simula chamada à API: GET /api/v1/activity/heatmap?userId=...&start=...&end=...
      console.log("Buscando mapa de calor...");
      await new Promise(resolve => setTimeout(resolve, 800)); // Simula latência de rede
      
      // Dados mockados para 30 dias (Exemplo: 5 commits no dia 1, 12 no dia 15)
      return {
        "2024-06-01": 5,
        "2024-06-15": 12,
        "2024-06-28": 8,
        // ... mais dias
      };
    },
    enabled: Boolean(user?.id),
  });

  // Estado de carregamento principal
  if (!user) return <p className="text-center py-12 text-muted-foreground">Faça login para ver o painel de controle.</p>;

  return (
    <AppLayout title="Dashboard" subtitle="Visão geral da produção do ateliê">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Projetos ativos" value={projects?.length.toString()} hint={`Total de ${projects?.reduce((acc, p) => acc + p.totalAssets, 0)} assets`} icon={FolderKanban} />
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
        {isLoadingHeatmap ? (
          <div className="flex items-center justify-center h-64">
            <p>Carregando mapa de calor...</p>
          </div>
        ) : (
          <ActivityHeatmap heatmapData={heatmap} /> // Passando dados mockados
        )}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DeliveryTrendChart />
        <ProjectList projects={projects} /> {/* Novo componente para exibir os projetos */}
      </div>
    </AppLayout>
  );
}

// *** IMPORTANTE: Criação de um novo componente ProjectList para exibir os dados de RF005 ***
function ProjectList({ projects }: { projects: { id: number, name: string, slug: string, totalAssets: number }[] }) {
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
            <button className="text-xs text-primary mt-1 hover:underline">Ver Dashboard ></button>
          </div>
        ))}
      </div>
    </div>
  );
}
