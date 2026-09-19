import { TASKS } from "@/lib/atelie-data";

const WEEKS = ["Sem 36", "Sem 37", "Sem 38", "Sem 39", "Sem 40", "Sem 41"];

const BARS = [
  { start: 0, span: 2 },
  { start: 1, span: 2 },
  { start: 2, span: 3 },
  { start: 0, span: 3 },
  { start: 3, span: 2 },
  { start: 4, span: 2 },
];

export function GanttView() {
  return (
    <div className="glass overflow-x-auto rounded-2xl p-5">
      <div className="min-w-[720px]">
        <div className="grid grid-cols-[220px_repeat(6,1fr)] gap-2 border-b border-border pb-2 text-xs text-muted-foreground">
          <span>Entregável</span>
          {WEEKS.map((w) => (
            <span key={w} className="text-center">
              {w}
            </span>
          ))}
        </div>

        {TASKS.map((task, i) => {
          const bar = BARS[i % BARS.length];
          if (!bar) return null;

          return (
            <div
              key={task.id}
              className="grid grid-cols-[220px_repeat(6,1fr)] items-center gap-2 border-b border-border/60 py-3"
            >
              <div className="min-w-0 pr-2">
                <p className="truncate text-sm font-medium">{task.title}</p>
                <p className="truncate text-xs text-muted-foreground">{task.client}</p>
              </div>
              {WEEKS.map((w, c) => (
                <div key={w} className="h-8">
                  {c === bar.start && (
                    <div
                      className="flex h-8 items-center rounded-lg px-2 text-[11px] font-medium text-primary-foreground"
                      style={{
                        backgroundImage: task.cover,
                        width: `calc(${bar.span * 100}% + ${(bar.span - 1) * 0.5}rem)`,
                      }}
                    >
                      {task.progress}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
