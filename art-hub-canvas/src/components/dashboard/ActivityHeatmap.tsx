import { useMemo } from "react";

const WEEKS = 26;
const DAYS = 7;
const LABELS = ["Abr", "Mai", "Jun", "Jul", "Ago", "Set"];

function levelColor(level: number) {
  const opacity = [0.06, 0.25, 0.45, 0.7, 1][level];
  return `color-mix(in oklab, var(--primary) ${opacity * 100}%, transparent)`;
}

export function ActivityHeatmap() {
  const cells = useMemo(() => {
    const out: number[] = [];
    let seed = 7;
    for (let i = 0; i < WEEKS * DAYS; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      const r = seed / 233280;
      out.push(r > 0.82 ? 4 : r > 0.66 ? 3 : r > 0.45 ? 2 : r > 0.25 ? 1 : 0);
    }
    return out;
  }, []);

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
                const level = cells[w * DAYS + d];
                return (
                  <span
                    key={d}
                    title={`${level * 3} entregas`}
                    className="size-3 rounded-sm transition-transform hover:scale-125"
                    style={{ background: levelColor(level) }}
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
