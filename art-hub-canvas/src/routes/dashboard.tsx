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
  return (
    <AppLayout title="Dashboard" subtitle="Visão geral da produção do ateliê">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Projetos ativos" value="24" hint="+3 desde a semana passada" icon={FolderKanban} />
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
        <FilesByClientChart />
      </div>
    </AppLayout>
  );
}
