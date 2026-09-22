import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as useAuth } from "./AuthContext-YBGnc6KQ.mjs";
import { C as FolderKanban, d as PackageCheck, m as Lock, v as HardDrive } from "../_libs/lucide-react.mjs";
import { c as Progress, l as fetchActivityHeatmap, t as AppLayout } from "./AppLayout-CCI_kPBB.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CoEei3ZE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEEKS = 26;
var DAYS = 7;
var LABELS = [
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set"
];
function levelColor(level) {
	return `color-mix(in oklab, var(--primary) ${([
		.06,
		.25,
		.45,
		.7,
		1
	][level] ?? .06) * 100}%, transparent)`;
}
function dateKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function ActivityHeatmap({ data }) {
	const cells = (0, import_react.useMemo)(() => {
		const counts = Object.values(data);
		const maxCount = Math.max(0, ...counts);
		const end = /* @__PURE__ */ new Date();
		const out = [];
		for (let index = 0; index < 182; index += 1) {
			const date = new Date(end);
			date.setDate(end.getDate() - (181 - index));
			const key = dateKey(date);
			const count = data[key] ?? 0;
			const level = maxCount === 0 ? 0 : Math.min(4, Math.ceil(count / maxCount * 4));
			out.push({
				level,
				count,
				date: key
			});
		}
		return out;
	}, [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Atividade de produção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Contribuições diárias nos últimos 6 meses"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-1 sm:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 text-xs text-muted-foreground",
						children: "Menos"
					}),
					[
						0,
						1,
						2,
						3,
						4
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-3 rounded-sm",
						style: { background: levelColor(l) }
					}, l)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-xs text-muted-foreground",
						children: "Mais"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 overflow-x-auto pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: Array.from({ length: WEEKS }).map((_, w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-1",
					children: Array.from({ length: DAYS }).map((_, d) => {
						const cell = cells[w * DAYS + d] ?? {
							level: 0,
							count: 0,
							date: ""
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							title: `${cell.count} atividades em ${cell.date}`,
							className: "size-3 rounded-sm transition-transform hover:scale-125",
							style: { background: levelColor(cell.level) }
						}, d);
					})
				}, w))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex justify-between text-xs text-muted-foreground",
				children: LABELS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m }, m))
			})]
		})]
	});
}
var tooltipStyle = {
	background: "var(--popover)",
	border: "1px solid var(--border)",
	borderRadius: "12px",
	color: "var(--popover-foreground)",
	fontSize: "12px"
};
function DeliveryTrendChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Tendência de entregas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Entregas finalizadas x rodadas de revisão"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gEntregas",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--chart-1)",
									stopOpacity: .6
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "var(--chart-1)",
									stopOpacity: 0
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gRevisoes",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--chart-2)",
									stopOpacity: .5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "var(--chart-2)",
									stopOpacity: 0
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "mes",
								stroke: "var(--muted-foreground)",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--muted-foreground)",
								fontSize: 12,
								tickLine: false,
								axisLine: false,
								width: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "entregas",
								stroke: "var(--chart-1)",
								strokeWidth: 2,
								fill: "url(#gEntregas)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "revisoes",
								stroke: "var(--chart-2)",
								strokeWidth: 2,
								fill: "url(#gRevisoes)"
							})
						]
					})
				})
			})
		]
	});
}
function MetricCard({ label, value, hint, icon: Icon, progress, tone = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass glass-hover rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-3xl font-semibold tracking-tight",
					children: value
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `flex size-10 items-center justify-center rounded-xl ${tone === "neon" ? "bg-neon/15 text-neon" : tone === "destructive" ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				})]
			}),
			progress !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: progress,
				className: "mt-4 h-2"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function getAuthHeaders() {
	const token = typeof window === "undefined" ? null : localStorage.getItem("authToken");
	return token ? { Authorization: `Bearer ${token}` } : {};
}
async function fetchProjects() {
	if (typeof window === "undefined") return [];
	const response = await fetch("http://localhost:8080/api/v1/projects", { headers: getAuthHeaders() });
	if (!response.ok) throw new Error("Não foi possível carregar os projetos.");
	return await response.json();
}
function DashboardPage() {
	const { user } = useAuth();
	const [category, setCategory] = (0, import_react.useState)("ALL");
	const { data: projects, isLoading: isLoadingProjects } = useQuery({
		queryKey: ["projects", user?.id],
		queryFn: fetchProjects,
		enabled: Boolean(user?.id)
	});
	const { data: heatmap, isLoading: isLoadingHeatmap } = useQuery({
		queryKey: ["heatmap", user?.id],
		queryFn: fetchActivityHeatmap,
		enabled: Boolean(user?.id)
	});
	const { data: deliveryTrend, isLoading: isLoadingDeliveryTrend } = useQuery({
		queryKey: ["delivery-trend", user?.id],
		queryFn: async () => {
			if (typeof window === "undefined") return [];
			const token = localStorage.getItem("authToken");
			const response = await fetch("http://localhost:8080/api/v1/activity/delivery-trend", { headers: token ? { Authorization: `Bearer ${token}` } : {} });
			if (!response.ok) throw new Error("Não foi possível carregar a tendência de entregas.");
			return await response.json();
		},
		enabled: Boolean(user?.id)
	});
	if (isLoadingProjects || isLoadingHeatmap || isLoadingDeliveryTrend) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		title: "Dashboard",
		subtitle: "Visão geral da produção do ateliê",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center h-64 text-lg text-muted-foreground",
			children: "Carregando dados do Painel de Controle..."
		})
	});
	const projectsData = projects || [];
	const heatmapData = (heatmap || []).reduce((result, item) => {
		result[item.date] = item.count;
		return result;
	}, {});
	const latestTrend = deliveryTrend?.at(-1);
	const filteredProjects = category === "ALL" ? projectsData : projectsData.filter((project) => project.category === category);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Dashboard",
		subtitle: "Visão geral da produção do ateliê",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Projetos ativos",
						value: projectsData.length.toString(),
						hint: "Dados sincronizados com a API",
						icon: FolderKanban
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Entregas na semana",
						value: String(latestTrend?.entregas ?? 0),
						hint: `${latestTrend?.revisoes ?? 0} revisões registradas no período`,
						icon: PackageCheck,
						tone: "neon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Artes travadas por NDA",
						value: "13",
						hint: "5 elegíveis para liberação",
						icon: Lock,
						tone: "destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Armazenamento usado",
						value: "412 GB",
						hint: "de 600 GB disponíveis",
						icon: HardDrive,
						progress: 69
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityHeatmap, { data: heatmapData })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeliveryTrendChart, { data: deliveryTrend ?? [] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectList, {
					projects: filteredProjects,
					category,
					onCategoryChange: setCategory
				})]
			})
		]
	});
}
function ProjectList({ projects, category, onCategoryChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass p-6 rounded-xl border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold",
				children: "Projetos em Destaque (RF005)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				"aria-label": "Filtrar projetos",
				children: [
					["ALL", "Todos"],
					["EMPRESA", "Empresas"],
					["ESTUDIO", "Estúdios"],
					["PESSOAL", "Pessoais"]
				].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onCategoryChange(value),
					className: `rounded-md px-2 py-1 text-xs ${category === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`,
					children: label
				}, value))
			})]
		}), projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-dashed border-border p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Ainda não há projetos nesta visão."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Crie um projeto ou aceite um convite para começar a acompanhar sua produção."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 text-xs font-medium text-primary hover:underline",
					children: "Criar projeto"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b pb-3 last:border-b-0 last:pb-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-primary",
							children: project.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: project.slug
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500 mt-1",
						children: project.description || "Projeto ativo sincronizado com a API."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-xs text-primary mt-1 hover:underline",
						children: "Ver Dashboard >"
					})
				]
			}, project.id))
		})]
	});
}
//#endregion
export { DashboardPage as component };
