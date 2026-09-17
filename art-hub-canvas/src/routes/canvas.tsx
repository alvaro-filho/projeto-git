import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { AppLayout } from "@/components/layout/AppLayout";
import { InfiniteCanvas } from "@/components/canvas/InfiniteCanvas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TASKS } from "@/lib/atelie-data";

export const Route = createFileRoute("/canvas")({
  validateSearch: (search: Record<string, unknown>) => ({
    task: typeof search.task === "string" ? search.task : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Canvas Infinito — Ateliê Studio" },
      {
        name: "description",
        content: "Moodboard infinito com notas adesivas, referências e vetores para cada tarefa do projeto.",
      },
      { property: "og:title", content: "Canvas Infinito — Ateliê Studio" },
      {
        property: "og:description",
        content: "Colaboração visual em canvas macro do projeto ou no canvas de uma tarefa específica.",
      },
    ],
  }),
  component: CanvasPage,
});

function CanvasPage() {
  const { task } = Route.useSearch();
  const navigate = useNavigate({ from: "/canvas" });
  const [value, setValue] = useState<string>(task ?? "macro");

  const selected = TASKS.find((t) => t.id === value);
  const label = selected ? `Canvas da Tarefa: ${selected.title}` : "Canvas Macro do Projeto (Moodboard Geral)";

  return (
    <AppLayout title="Canvas Infinito" subtitle="Colaboração visual em tempo real">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Select
          value={value}
          onValueChange={(v) => {
            setValue(v);
            navigate({ search: { task: v === "macro" ? undefined : v } });
          }}
        >
          <SelectTrigger className="glass w-80">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="macro">Canvas Macro do Projeto</SelectItem>
            {TASKS.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                Canvas da Tarefa: {t.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selected && (
          <Badge variant="outline" className="border-neon/50 text-neon">
            Prazo {selected.deadline} · {selected.client}
          </Badge>
        )}
      </div>

      <InfiniteCanvas contextLabel={label} />
    </AppLayout>
  );
}
