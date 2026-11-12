import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-YBGnc6KQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (context === void 0) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
/**
* Provedor de Contexto para gerenciar o estado de autenticação global.
*/
var AuthProvider = ({ children, initialToken, initialUser }) => {
	const [user, setUser] = (0, import_react.useState)(initialUser || null);
	const [token, setToken] = (0, import_react.useState)(initialToken || null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") {
			setIsLoading(false);
			return;
		}
		const storedToken = localStorage.getItem("authToken");
		const storedUser = localStorage.getItem("userProfile");
		setToken(storedToken);
		if (storedUser) try {
			setUser(JSON.parse(storedUser));
		} catch {
			localStorage.removeItem("userProfile");
		}
		setIsLoading(false);
	}, []);
	const persistSession = (data) => {
		if (!data.token || !data.user) throw new Error("A resposta da API não contém uma sessão válida.");
		localStorage.setItem("authToken", data.token);
		localStorage.setItem("userProfile", JSON.stringify(data.user));
		setUser(data.user);
		setToken(data.token);
	};
	const requestAuth = async (endpoint, body) => {
		const response = await fetch(`http://localhost:8080/api/v1/auth/${endpoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		const responseText = await response.text();
		let data = {};
		try {
			data = responseText ? JSON.parse(responseText) : {};
		} catch {
			data.message = responseText;
		}
		if (!response.ok) throw new Error(data.message || "Não foi possível concluir a autenticação.");
		persistSession(data);
	};
	const login = async (email, password) => {
		if (!email || typeof email !== "string" || !password || typeof password !== "string") {
			console.error("Dados de login inválidos fornecidos. Email e senha devem ser strings não vazias.");
			throw new Error("Email e senha são obrigatórios.");
		}
		setIsLoading(true);
		try {
			await requestAuth("login", {
				email,
				password
			});
		} catch (error) {
			console.error("Erro ao tentar fazer login:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};
	const register = async (fullName, username, email, password, role) => {
		if (!fullName.trim() || !username.trim() || !email.trim() || !password || !role) throw new Error("Nome completo, usuário, e-mail, senha e perfil são obrigatórios.");
		setIsLoading(true);
		try {
			await requestAuth("register", {
				fullName,
				username,
				email,
				password,
				role
			});
		} finally {
			setIsLoading(false);
		}
	};
	const logout = () => {
		console.log("Realizando logout e limpando dados.");
		setUser(null);
		setToken(null);
		localStorage.removeItem("authToken");
		localStorage.removeItem("userProfile");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			isAuthenticated: !!token,
			isLoading,
			login,
			register,
			logout
		},
		children
	});
};
//#endregion
export { useAuth as n, AuthProvider as t };
