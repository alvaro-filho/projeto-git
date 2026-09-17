import { Link } from "@tanstack/react-router";
import { CalendarClock, Flag, Layers, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { Task } from "@/lib/atelie-data";

export function TaskDetailModal({
  task,
  onOpenChange,
}: {
  task: Task | null;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={!!task} onOpenChange={onOpenChange}>
      <DialogContent className="glass sm:max-w-xl">
        {task && (
          <>
            <div className="h-28 rounded-xl" style={{ backgroundImage: task.cover }} />
            <DialogHeader>
              <DialogTitle>{task.title}</DialogTitle>
              <DialogDescription>{task.description}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 sm:grid-cols-2">
              <Info icon={User} label="Contratante" value={task.client} />
              <Info icon={Layers} label="Entregável" value={task.deliverable} />
              <Info icon={CalendarClock} label="Prazo" value={task.deadline} />
              <Info icon={Flag} label="Prioridade" value={task.priority} />
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progresso</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="mt-2 h-2" />
            </div>

            <DialogFooter className="sm:justify-between">
              <Badge variant="outline" className="border-neon/50 text-neon">
                Sincronizado com o canvas
              </Badge>
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/canvas" search={{ task: task.id }}>
                  Abrir Canvas da Tarefa
                </Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-xl p-3">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
