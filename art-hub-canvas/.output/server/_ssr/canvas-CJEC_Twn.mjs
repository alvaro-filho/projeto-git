import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./canvas-BuVYwyWt.mjs";
import { r as cn, t as Button } from "./input-BZBVMCdW.mjs";
import { A as ChevronDown, _ as Image, c as PenTool, f as Minus, j as Check, k as ChevronUp, r as StickyNote, s as Plus, y as Hand } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as AppLayout, u as logActivity } from "./AppLayout-CCI_kPBB.mjs";
import { i as TASKS, n as Badge } from "./atelie-data-Bx8L3Epv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/canvas-CJEC_Twn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL = [
	{
		id: "n1",
		type: "note",
		x: 60,
		y: 70,
		text: "Paleta fria + acentos âmbar"
	},
	{
		id: "n2",
		type: "note",
		x: 330,
		y: 200,
		text: "Silhueta precisa ler a 10% de zoom"
	},
	{
		id: "i1",
		type: "image",
		x: 620,
		y: 90,
		text: "Ref. arquitetura",
		cover: "linear-gradient(135deg,#6366f1,#22d3ee)"
	},
	{
		id: "i2",
		type: "image",
		x: 420,
		y: 380,
		text: "Estudo de luz",
		cover: "linear-gradient(135deg,#f472b6,#a855f7)"
	},
	{
		id: "v1",
		type: "vector",
		x: 120,
		y: 330,
		text: "Grid de composição"
	}
];
var TOOLS = [
	{
		id: "pan",
		label: "Mover",
		icon: Hand
	},
	{
		id: "image",
		label: "Adicionar imagem",
		icon: Image
	},
	{
		id: "note",
		label: "Nota adesiva",
		icon: StickyNote
	},
	{
		id: "vector",
		label: "Vetor",
		icon: PenTool
	}
];
function InfiniteCanvas({ contextLabel }) {
	const [items, setItems] = (0, import_react.useState)(INITIAL);
	const [tool, setTool] = (0, import_react.useState)("pan");
	const [zoom, setZoom] = (0, import_react.useState)(100);
	const dragRef = (0, import_react.useRef)(null);
	const areaRef = (0, import_react.useRef)(null);
	const onPointerDown = (e, item) => {
		const rect = areaRef.current?.getBoundingClientRect();
		if (!rect) return;
		dragRef.current = {
			id: item.id,
			dx: e.clientX - rect.left - item.x,
			dy: e.clientY - rect.top - item.y
		};
		e.target.setPointerCapture(e.pointerId);
	};
	const onPointerMove = (0, import_react.useCallback)((e) => {
		const drag = dragRef.current;
		const rect = areaRef.current?.getBoundingClientRect();
		if (!drag || !rect) return;
		const x = Math.max(0, e.clientX - rect.left - drag.dx);
		const y = Math.max(0, e.clientY - rect.top - drag.dy);
		setItems((prev) => prev.map((it) => it.id === drag.id ? {
			...it,
			x,
			y
		} : it));
	}, []);
	const addItem = (type) => {
		setTool(type);
		logActivity("CANVAS_EDIT");
		setItems((prev) => [...prev, {
			id: `${type}-${Date.now()}`,
			type,
			x: 200 + prev.length * 18,
			y: 150 + prev.length * 14,
			text: type === "note" ? "Nova nota" : type === "image" ? "Nova referência" : "Novo vetor",
			cover: "linear-gradient(135deg,#34d399,#6366f1)"
		}]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-[calc(100vh-11rem)] overflow-hidden rounded-2xl border border-border bg-[oklch(0.17_0.02_265)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: areaRef,
				onPointerMove,
				onPointerUp: () => dragRef.current = null,
				className: "dot-grid absolute inset-0",
				style: { backgroundSize: `${24 * (zoom / 100)}px ${24 * (zoom / 100)}px` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 origin-top-left",
					style: { transform: `scale(${zoom / 100})` },
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onPointerDown: (e) => onPointerDown(e, item),
						className: "absolute cursor-grab touch-none select-none active:cursor-grabbing",
						style: {
							left: item.x,
							top: item.y
						},
						children: [
							item.type === "note" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-44 rounded-lg bg-[oklch(0.86_0.15_95)] p-3 text-sm text-[oklch(0.25_0.05_95)] shadow-lg",
								children: item.text
							}),
							item.type === "image" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass w-52 rounded-xl p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-28 rounded-lg",
									style: { backgroundImage: item.cover }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: item.text
								})]
							}),
							item.type === "vector" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-32 items-center justify-center rounded-xl border-2 border-dashed border-primary/70 text-xs text-primary",
								children: item.text
							})
						]
					}, item.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass pointer-events-none absolute top-4 left-4 rounded-xl px-3 py-2 text-xs text-muted-foreground",
				children: contextLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass absolute right-4 bottom-4 h-28 w-40 overflow-hidden rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-b border-border px-2 py-1 text-[10px] text-muted-foreground",
					children: "Minimapa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-full",
					children: [items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute size-1.5 rounded-full bg-primary",
						style: {
							left: `${it.x / 900 * 100}%`,
							top: `${it.y / 600 * 70}%`
						}
					}, it.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-2 rounded border border-primary/50" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-2xl p-1.5",
				children: [
					TOOLS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: tool === t.id ? "default" : "ghost",
						"aria-label": t.label,
						title: t.label,
						className: tool === t.id ? "gradient-primary text-primary-foreground" : "",
						onClick: () => t.id === "pan" ? setTool("pan") : addItem(t.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "size-4" })
					}, t.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 h-6 w-px bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						"aria-label": "Zoom out",
						onClick: () => setZoom((z) => Math.max(40, z - 10)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "w-12 text-center text-xs text-muted-foreground",
						children: [zoom, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						"aria-label": "Zoom in",
						onClick: () => setZoom((z) => Math.min(180, z + 10)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					})
				]
			})
		]
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function CanvasPage() {
	const { task } = Route.useSearch();
	const navigate = useNavigate({ from: "/canvas" });
	const [value, setValue] = (0, import_react.useState)(task ?? "macro");
	const selected = TASKS.find((t) => t.id === value);
	const label = selected ? `Canvas da Tarefa: ${selected.title}` : "Canvas Macro do Projeto (Moodboard Geral)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Canvas Infinito",
		subtitle: "Colaboração visual em tempo real",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value,
				onValueChange: (v) => {
					setValue(v);
					navigate({ search: { task: v === "macro" ? void 0 : v } });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "glass w-80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "macro",
					children: "Canvas Macro do Projeto"
				}), TASKS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
					value: t.id,
					children: ["Canvas da Tarefa: ", t.title]
				}, t.id))] })]
			}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "border-neon/50 text-neon",
				children: [
					"Prazo ",
					selected.deadline,
					" · ",
					selected.client
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteCanvas, { contextLabel: label })]
	});
}
//#endregion
export { CanvasPage as component };
