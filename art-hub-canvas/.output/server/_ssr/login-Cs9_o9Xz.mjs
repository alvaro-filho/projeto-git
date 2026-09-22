import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as useAuth } from "./AuthContext-YBGnc6KQ.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Input, r as cn, t as Button } from "./input-BZBVMCdW.mjs";
import { N as Building2, O as Chromium, a as Sparkles, n as User, u as Palette } from "../_libs/lucide-react.mjs";
import { n as TabsList, r as TabsTrigger, t as Tabs } from "./tabs-C25WyLB0.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cs9_o9Xz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function LoginPage() {
	const [mode, setMode] = (0, import_react.useState)("entrar");
	const [profile, setProfile] = (0, import_react.useState)("artista");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const { login, register } = useAuth();
	const navigate = useNavigate();
	const handleLogin = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMessage(null);
		try {
			if (mode === "entrar") await login(email, password);
			else await register(fullName, username, email, password, profile === "artista" ? "ARTIST" : "COMPANY");
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : "Não foi possível concluir a operação.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -left-24 size-96 rounded-full bg-primary/25 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-24 -bottom-32 size-96 rounded-full bg-neon/15 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass fade-up relative w-full max-w-md rounded-3xl p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "gradient-primary flex size-11 items-center justify-center rounded-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-6 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-semibold",
							children: "Ateliê Studio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Produção artística, colaboração e NDA"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						value: mode,
						onValueChange: setMode,
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2 bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "entrar",
								children: "Entrar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "cadastro",
								children: "Criar Cadastro"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Tipo de perfil"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileButton, {
								active: profile === "artista",
								icon: User,
								label: "Artista / Freelancer",
								onClick: () => setProfile("artista")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileButton, {
								active: profile === "empresa",
								icon: Building2,
								label: "Empresa / Estúdio",
								onClick: () => setProfile("empresa")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-5 space-y-4",
						onSubmit: handleLogin,
						children: [
							mode === "cadastro" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "fullName",
									children: "Nome completo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "fullName",
									type: "text",
									placeholder: "Seu nome completo",
									className: "bg-white/5",
									value: fullName,
									onChange: (e) => setFullName(e.target.value),
									required: true
								})]
							}),
							mode === "cadastro" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "username",
									children: "Nome de usuário"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "username",
									type: "text",
									placeholder: "seu_usuario",
									className: "bg-white/5",
									value: username,
									onChange: (e) => setUsername(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "E-mail"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									placeholder: "voce@atelie.com",
									className: "bg-white/5",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "senha",
									children: "Senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "senha",
									type: "password",
									placeholder: "••••••••",
									className: "bg-white/5",
									minLength: 8,
									pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}",
									title: "Use no mínimo 8 caracteres, com uma letra maiúscula, uma minúscula e um número.",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: isLoading,
								className: "gradient-primary w-full text-primary-foreground",
								children: isLoading ? "Autenticando..." : mode === "entrar" ? "Entrar no ateliê" : "Criar cadastro"
							}),
							errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive",
								children: errorMessage
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							"ou continue com",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chromium, { className: "size-4" }), "Google"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "ArtStation"]
						})]
					})
				]
			})
		]
	});
}
function ProfileButton({ active, icon: Icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `glass rounded-xl p-3 text-left text-sm transition-colors ${active ? "border-primary/70 shadow-[var(--shadow-glow)]" : "text-muted-foreground"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-4 ${active ? "text-primary" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-2 block leading-tight",
			children: label
		})]
	});
}
//#endregion
export { LoginPage as component };
