import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./input-BZBVMCdW.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var COLUMNS = [
	{
		id: "todo",
		label: "A Fazer"
	},
	{
		id: "progress",
		label: "Em Progresso"
	},
	{
		id: "review",
		label: "Em Revisão"
	},
	{
		id: "done",
		label: "Concluído"
	}
];
var TASKS = [
	{
		id: "t1",
		title: "Concept Art — Cidade Flutuante",
		client: "Nebula Games",
		deliverable: "3 pranchas em 4K (.psd)",
		deadline: "24 set",
		priority: "Alta",
		status: "todo",
		cover: "linear-gradient(135deg,#6366f1,#22d3ee)",
		description: "Exploração de silhuetas e paleta para o bioma central do jogo. Referências no moodboard macro do projeto.",
		progress: 10
	},
	{
		id: "t2",
		title: "Character Sheet — Kaia",
		client: "Estúdio Vértice",
		deliverable: "Turnaround + expressões",
		deadline: "26 set",
		priority: "Alta",
		status: "progress",
		cover: "linear-gradient(135deg,#a855f7,#6366f1)",
		description: "Ajustar proporções aprovadas na revisão anterior e fechar cartela de cores.",
		progress: 55
	},
	{
		id: "t3",
		title: "Modelagem — Prop Relicário",
		client: "Nebula Games",
		deliverable: "Arquivo .blend + bake",
		deadline: "28 set",
		priority: "Média",
		status: "progress",
		cover: "linear-gradient(135deg,#0ea5e9,#6366f1)",
		description: "Highpoly finalizado, falta retopologia e UVs.",
		progress: 40
	},
	{
		id: "t4",
		title: "Key Art — Campanha Outono",
		client: "Lumen Brands",
		deliverable: "Poster 3000x4000",
		deadline: "22 set",
		priority: "Alta",
		status: "review",
		cover: "linear-gradient(135deg,#f472b6,#a855f7)",
		description: "Aguardando parecer do diretor de arte sobre o tratamento de luz.",
		progress: 85
	},
	{
		id: "t5",
		title: "Storyboard — Trailer 30s",
		client: "Estúdio Vértice",
		deliverable: "24 quadros",
		deadline: "20 set",
		priority: "Baixa",
		status: "review",
		cover: "linear-gradient(135deg,#34d399,#6366f1)",
		description: "Revisão de ritmo entre os quadros 12 e 18.",
		progress: 70
	},
	{
		id: "t6",
		title: "Ilustração — Capa Artbook",
		client: "Lumen Brands",
		deliverable: "Arte final + camadas",
		deadline: "15 set",
		priority: "Média",
		status: "done",
		cover: "linear-gradient(135deg,#fbbf24,#f472b6)",
		description: "Entregue e aprovada, liberada para portfólio após NDA.",
		progress: 100
	}
];
var ARTWORKS = [
	{
		id: "a1",
		title: "Cidade Flutuante — Plano Geral",
		client: "Nebula Games",
		cover: "linear-gradient(135deg,#6366f1,#22d3ee)",
		locked: true
	},
	{
		id: "a2",
		title: "Kaia — Turnaround",
		client: "Estúdio Vértice",
		cover: "linear-gradient(135deg,#a855f7,#6366f1)",
		locked: true
	},
	{
		id: "a3",
		title: "Key Art Outono",
		client: "Lumen Brands",
		cover: "linear-gradient(135deg,#f472b6,#a855f7)",
		locked: false
	},
	{
		id: "a4",
		title: "Relicário — Render Final",
		client: "Nebula Games",
		cover: "linear-gradient(135deg,#0ea5e9,#6366f1)",
		locked: true
	},
	{
		id: "a5",
		title: "Capa Artbook",
		client: "Lumen Brands",
		cover: "linear-gradient(135deg,#fbbf24,#f472b6)",
		locked: false
	},
	{
		id: "a6",
		title: "Estudo de Luz — Deserto",
		client: "Orbit Media",
		cover: "linear-gradient(135deg,#34d399,#6366f1)",
		locked: false
	},
	{
		id: "a7",
		title: "Criaturas — Sheet 02",
		client: "Nebula Games",
		cover: "linear-gradient(135deg,#f97316,#a855f7)",
		locked: true
	},
	{
		id: "a8",
		title: "Cenário — Templo Submerso",
		client: "Estúdio Vértice",
		cover: "linear-gradient(135deg,#22d3ee,#6366f1)",
		locked: false
	}
];
//#endregion
export { TASKS as i, Badge as n, COLUMNS as r, ARTWORKS as t };
