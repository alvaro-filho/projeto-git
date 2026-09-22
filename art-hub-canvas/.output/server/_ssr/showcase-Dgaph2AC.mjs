import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./input-BZBVMCdW.mjs";
import { D as CircleCheck, P as BookOpen, m as Lock } from "../_libs/lucide-react.mjs";
import { i as DialogDescription, n as Dialog, o as DialogHeader, r as DialogContent, s as DialogTitle, t as AppLayout } from "./AppLayout-CCI_kPBB.mjs";
import { n as Badge, t as ARTWORKS } from "./atelie-data-Bx8L3Epv.mjs";
import { n as TabsList, r as TabsTrigger, t as Tabs } from "./tabs-C25WyLB0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/showcase-Dgaph2AC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArtbookModal({ open, onOpenChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "glass sm:max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5 text-primary" }), "Artbook Digital Exclusivo"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Bastidores do processo: esboços, camadas descartadas e comentários da direção de arte." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid max-h-[60vh] gap-4 overflow-y-auto sm:grid-cols-2",
				children: ARTWORKS.slice(0, 6).map((art, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "glass rounded-xl p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-36 rounded-lg",
							style: { backgroundImage: art.cover }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-2 text-sm font-medium",
							children: art.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Etapa ",
								i + 1,
								" — ",
								i % 2 === 0 ? "esboço e bloqueio de valores" : "pintura final e ajustes de cor"
							]
						})
					]
				}, art.id))
			})]
		})
	});
}
function ShowcasePage() {
	const [artworks, setArtworks] = (0, import_react.useState)(ARTWORKS);
	const [filter, setFilter] = (0, import_react.useState)("todas");
	const [artbookOpen, setArtbookOpen] = (0, import_react.useState)(false);
	const visible = artworks.filter((a) => filter === "travadas" ? a.locked : filter === "liberadas" ? !a.locked : true);
	const release = (id) => setArtworks((prev) => prev.map((a) => a.id === id ? {
		...a,
		locked: false
	} : a));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		title: "Vitrine & NDA",
		subtitle: "Controle de publicação das artes entregues",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: filter,
					onValueChange: setFilter,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "bg-white/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "todas",
								children: "Todas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "travadas",
								children: "Travadas por NDA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "liberadas",
								children: "Liberadas"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gradient-primary text-primary-foreground",
					onClick: () => setArtbookOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), "Artbook Digital Exclusivo"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fade-up mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: visible.map((art) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass glass-hover overflow-hidden rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-44",
						style: { backgroundImage: art.cover },
						children: [art.locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 backdrop-blur-[6px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/40" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 left-3",
							children: art.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-destructive text-destructive-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), "Travado por NDA"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-neon text-neon-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "Liberado / Publicado"]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: art.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: art.client
							}),
							art.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "gradient-primary mt-3 w-full text-primary-foreground",
								onClick: () => release(art.id),
								children: "Aprovar Liberação"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "mt-3 w-full bg-white/5",
								disabled: true,
								children: "No portfólio"
							})
						]
					})]
				}, art.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtbookModal, {
				open: artbookOpen,
				onOpenChange: setArtbookOpen
			})
		]
	});
}
//#endregion
export { ShowcasePage as component };
