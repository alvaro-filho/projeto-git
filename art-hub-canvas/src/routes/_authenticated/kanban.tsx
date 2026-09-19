import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/layout/AppLayout";
import { GanttView } from "@/components/kanban/GanttView";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { TaskDetailModal } from "@/components/kanban/TaskDetailModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Task } from "@/lib/atelie-data";

export const Route = createFileRoute("/_authenticated/kanban")({
  head: () => ({
    meta: [
      { title: "Kanban & Cronograma — Ateliê Studio" },
      {
        name: "description",
        content:
          "Organize entregáveis no quadro kanban com arrastar e soltar ou acompanhe prazos no cronograma.",
      },
      { property: "og:title", content: "Kanban & Cronograma — Ateliê Studio" },
      {
        property: "og:description",
        content: "Quadro de tarefas e visão de cronograma para a produção do estúdio.",
      },
    ],
  }),
  component: KanbanPage,
});

function KanbanPage() {
  const [view, setView] = useState("quadro");
  const [task, setTask] = useState<Task | null>(null);

  return (
    <AppLayout title="Quadro & Cronograma" subtitle="Fluxo de entregáveis do ateliê">
      <Tabs value={view} onValueChange={setView}>
        <TabsList className="bg-white/5">
          <TabsTrigger value="quadro">Visão Quadro (Kanban)</TabsTrigger>
          <TabsTrigger value="gantt">Visão Cronograma (Gantt)</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="fade-up mt-4">
        {view === "quadro" ? <KanbanBoard onOpenTask={setTask} /> : <GanttView />}
      </div>

      <TaskDetailModal task={task} onOpenChange={(v) => !v && setTask(null)} />
    </AppLayout>
  );
}
