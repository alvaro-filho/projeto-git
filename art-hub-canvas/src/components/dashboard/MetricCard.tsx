import type { LucideIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  progress,
  tone = "primary",
}: {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  progress?: number;
  tone?: "primary" | "neon" | "destructive";
}) {
  const toneClass =
    tone === "neon"
      ? "bg-neon/15 text-neon"
      : tone === "destructive"
        ? "bg-destructive/15 text-destructive"
        : "bg-primary/15 text-primary";

  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className={`flex size-10 items-center justify-center rounded-xl ${toneClass}`}>
          <Icon className="size-5" />
        </span>
      </div>
      {progress !== undefined ? (
        <Progress value={progress} className="mt-4 h-2" />
      ) : null}
      <p className="mt-3 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
