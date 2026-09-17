import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DELIVERY_TREND, FILES_BY_CLIENT } from "@/lib/atelie-data";

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  color: "var(--popover-foreground)",
  fontSize: "12px",
};

export function DeliveryTrendChart() {
  return (
    <div className="glass rounded-2xl p-5">
      <h2 className="text-sm font-semibold">Tendência de entregas</h2>
      <p className="text-xs text-muted-foreground">Entregas finalizadas x rodadas de revisão</p>
      <div className="mt-4 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DELIVERY_TREND}>
            <defs>
              <linearGradient id="gEntregas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gRevisoes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={28} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="entregas" stroke="var(--chart-1)" strokeWidth={2} fill="url(#gEntregas)" />
            <Area type="monotone" dataKey="revisoes" stroke="var(--chart-2)" strokeWidth={2} fill="url(#gRevisoes)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function FilesByClientChart() {
  return (
    <div className="glass rounded-2xl p-5">
      <h2 className="text-sm font-semibold">Arquivos por contratante</h2>
      <p className="text-xs text-muted-foreground">Volume acumulado no ateliê</p>
      <div className="mt-4 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FILES_BY_CLIENT} layout="vertical" margin={{ left: 12 }}>
            <CartesianGrid stroke="var(--border)" horizontal={false} />
            <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="cliente"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
            <Bar dataKey="arquivos" fill="var(--chart-1)" radius={[0, 8, 8, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
