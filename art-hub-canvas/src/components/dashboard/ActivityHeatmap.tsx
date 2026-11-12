import { useMemo } from "react";

const WEEKS = 26;
const DAYS = 7;
const LABELS = ["Abr", "Mai", "Jun", "Jul", "Ago", "Set"];

function levelColor(level: number) {
  const opacity = [0.06, 0.25, 0.45, 0.7, 1][level] ?? 0.06;
  return `color-mix(in oklab, var(--primary) ${opacity * 100}%, transparent)`;
}

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ActivityHeatmap({ data }: { data: Record<string, number> }) {
  const cells = useMemo(() => {
    const counts = Object.values(data);
    const maxCount = Math.max(0, ...counts);
    const end = new Date();
    const out: Array<{ level: number; count: number; date: string }> = [];

    for (let index = 0; index < WEEKS * DAYS; index += 1) {
      const date = new Date(end);
      date.setDate(end.getDate() - (WEEKS * DAYS - 1 - index));
      const key = dateKey(date);
      const count = data[key] ?? 0;
      const level = maxCount === 0 ? 0 : Math.min(4, Math.ceil((count / maxCount) * 4));
      out.push({ level, count, date: key });
    }

    return out;
  }, [data]);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Atividade de produção</h2>
          <p className="text-xs text-muted-foreground">Contribuições diárias nos últimos 6 meses</p>
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          <span className="mr-1 text-xs text-muted-foreground">Menos</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="size-3 rounded-sm" style={{ background: levelColor(l) }} />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">Mais</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="flex gap-1">
          {Array.from({ length: WEEKS }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1">
              {Array.from({ length: DAYS }).map((_, d) => {
                const cell = cells[w * DAYS + d] ?? { level: 0, count: 0, date: "" };
                return (
                  <span
                    key={d}
                    title={`${cell.count} atividades em ${cell.date}`}
                    className="size-3 rounded-sm transition-transform hover:scale-125"
                    style={{ background: levelColor(cell.level) }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {LABELS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
