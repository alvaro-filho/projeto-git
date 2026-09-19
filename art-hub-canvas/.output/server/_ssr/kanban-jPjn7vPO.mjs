import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./input-BZBVMCdW.mjs";
import { M as CalendarClock, b as GripVertical, g as Layers, n as User, w as Flag } from "../_libs/lucide-react.mjs";
import { a as DialogFooter, c as Progress, i as DialogDescription, n as Dialog, o as DialogHeader, r as DialogContent, s as DialogTitle, t as AppLayout, u as logActivity } from "./AppLayout-CCI_kPBB.mjs";
import { i as TASKS, n as Badge, r as COLUMNS } from "./atelie-data-Bx8L3Epv.mjs";
import { n as TabsList, r as TabsTrigger, t as Tabs } from "./tabs-C25WyLB0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kanban-jPjn7vPO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEEKS = [
	"Sem 36",
	"Sem 37",
	"Sem 38",
	"Sem 39",
	"Sem 40",
	"Sem 41"
];
var BARS = [
	{
		start: 0,
		span: 2
	},
	{
		start: 1,
		span: 2
	},
	{
		start: 2,
		span: 3
	},
	{
		start: 0,
		span: 3
	},
	{
		start: 3,
		span: 2
	},
	{
		start: 4,
		span: 2
	}
];
function GanttView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass overflow-x-auto rounded-2xl p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-[720px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[220px_repeat(6,1fr)] gap-2 border-b border-border pb-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Entregável" }), WEEKS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-center",
					children: w
				}, w))]
			}), TASKS.map((task, i) => {
				const bar = BARS[i % BARS.length];
				if (!bar) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[220px_repeat(6,1fr)] items-center gap-2 border-b border-border/60 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 pr-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: task.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: task.client
						})]
					}), WEEKS.map((w, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8",
						children: c === bar.start && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-8 items-center rounded-lg px-2 text-[11px] font-medium text-primary-foreground",
							style: {
								backgroundImage: task.cover,
								width: `calc(${bar.span * 100}% + ${(bar.span - 1) * .5}rem)`
							},
							children: [task.progress, "%"]
						})
					}, w))]
				}, task.id);
			})]
		})
	});
}
function KanbanBoard({ onOpenTask }) {
	const [tasks, setTasks] = (0, import_react.useState)(TASKS);
	const [dragging, setDragging] = (0, import_react.useState)(null);
	const [overColumn, setOverColumn] = (0, import_react.useState)(null);
	const move = (id, status) => {
		const task = tasks.find((item) => item.id === id);
		if (status === "done" && task?.status !== "done") logActivity("TASK_COMPLETED");
		setTasks((prev) => prev.map((t) => t.id === id ? {
			...t,
			status
		} : t));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 lg:grid-cols-4",
		children: COLUMNS.map((col) => {
			const items = tasks.filter((t) => t.status === col.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				onDragOver: (e) => {
					e.preventDefault();
					setOverColumn(col.id);
				},
				onDragLeave: () => setOverColumn((c) => c === col.id ? null : c),
				onDrop: () => {
					if (dragging) move(dragging, col.id);
					setDragging(null);
					setOverColumn(null);
				},
				className: `glass rounded-2xl p-3 transition-colors ${overColumn === col.id ? "border-primary/60" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-3 flex items-center justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: col.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "bg-white/10",
						children: items.length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-40 flex-col gap-3",
					children: items.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						draggable: true,
						onDragStart: () => setDragging(task.id),
						onDragEnd: () => setDragging(null),
						onClick: () => onOpenTask(task),
						className: `glass glass-hover cursor-pointer rounded-xl p-3 ${dragging === task.id ? "opacity-50" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 rounded-lg",
								style: { backgroundImage: task.cover }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: task.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: task.client
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: task.priority === "Alta" ? "border-destructive/50 text-destructive" : task.priority === "Média" ? "border-primary/50 text-primary" : "border-neon/50 text-neon",
									children: task.priority
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3" }), task.deadline]
								})]
							})
						]
					}, task.id))
				})]
			}, col.id);
		})
	});
}
function TaskDetailModal({ task, onOpenChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!task,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "glass sm:max-w-xl",
			children: task && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-28 rounded-xl",
					style: { backgroundImage: task.cover }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: task.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: task.description })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: User,
							label: "Contratante",
							value: task.client
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Layers,
							label: "Entregável",
							value: task.deliverable
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: CalendarClock,
							label: "Prazo",
							value: task.deadline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Flag,
							label: "Prioridade",
							value: task.priority
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progresso" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [task.progress, "%"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: task.progress,
					className: "mt-2 h-2"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "border-neon/50 text-neon",
						children: "Sincronizado com o canvas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "gradient-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/canvas",
							search: { task: task.id },
							children: "Abrir Canvas da Tarefa"
						})
					})]
				})
			] })
		})
	});
}
function Info({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-medium",
			children: value
		})]
	});
}
function KanbanPage() {
	const [view, setView] = (0, import_react.useState)("quadro");
	const [task, setTask] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Quadro & Cronograma",
		subtitle: "Fluxo de entregáveis do ateliê",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: view,
				onValueChange: setView,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "quadro",
						children: "Visão Quadro (Kanban)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "gantt",
						children: "Visão Cronograma (Gantt)"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fade-up mt-4",
				children: view === "quadro" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanbanBoard, { onOpenTask: setTask }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GanttView, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskDetailModal, {
				task,
				onOpenChange: (v) => !v && setTask(null)
			})
		]
	});
}
//#endregion
export { KanbanPage as component };
