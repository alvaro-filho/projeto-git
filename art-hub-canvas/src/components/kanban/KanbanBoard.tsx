import { useState } from "react";
import { CalendarClock, GripVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { COLUMNS, TASKS, type Task, type TaskStatus } from "@/lib/atelie-data";

export function KanbanBoard({ onOpenTask }: { onOpenTask: (task: Task) => void }) {
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [dragging, setDragging] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<TaskStatus | null>(null);

  const move = (id: string, status: TaskStatus) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col.id);
        return (
          <section
            key={col.id}
            onDragOver={(e) => {
              e.preventDefault();
              setOverColumn(col.id);
            }}
            onDragLeave={() => setOverColumn((c) => (c === col.id ? null : c))}
            onDrop={() => {
              if (dragging) move(dragging, col.id);
              setDragging(null);
              setOverColumn(null);
            }}
            className={`glass rounded-2xl p-3 transition-colors ${
              overColumn === col.id ? "border-primary/60" : ""
            }`}
          >
            <header className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold">{col.label}</h2>
              <Badge variant="secondary" className="bg-white/10">
                {items.length}
              </Badge>
            </header>

            <div className="flex min-h-40 flex-col gap-3">
              {items.map((task) => (
                <article
                  key={task.id}
                  draggable
                  onDragStart={() => setDragging(task.id)}
                  onDragEnd={() => setDragging(null)}
                  onClick={() => onOpenTask(task)}
                  className={`glass glass-hover cursor-pointer rounded-xl p-3 ${
                    dragging === task.id ? "opacity-50" : ""
                  }`}
                >
                  <div className="h-16 rounded-lg" style={{ backgroundImage: task.cover }} />
                  <div className="mt-3 flex items-start gap-2">
                    <GripVertical className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{task.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{task.client}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={
                        task.priority === "Alta"
                          ? "border-destructive/50 text-destructive"
                          : task.priority === "Média"
                            ? "border-primary/50 text-primary"
                            : "border-neon/50 text-neon"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarClock className="size-3" />
                      {task.deadline}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
