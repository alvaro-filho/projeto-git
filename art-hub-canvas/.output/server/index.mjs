globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/atelie-data-CJwnnwMc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e74-TDHOlGXhkeDJUmeJxA2Pug5C9wE\"",
		"mtime": "2026-09-19T17:22:07.771Z",
		"size": 3700,
		"path": "../public/assets/atelie-data-CJwnnwMc.js"
	},
	"/assets/AppLayout-CV7b7tyX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16951-iqwQRumceH5H8J6e1v8/HOMXzrQ\"",
		"mtime": "2026-09-19T17:22:07.770Z",
		"size": 92497,
		"path": "../public/assets/AppLayout-CV7b7tyX.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-19T14:38:29.700Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/AuthContext-RDz2vQap.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d87-9tSfn8fFffi3wWRbkcyC9wLUWOg\"",
		"mtime": "2026-09-19T17:22:07.770Z",
		"size": 11655,
		"path": "../public/assets/AuthContext-RDz2vQap.js"
	},
	"/assets/canvas-Bz65vXtZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fea-JhazjS+EQjxB9Ef2CbNmd1Gw/f4\"",
		"mtime": "2026-09-19T17:22:07.772Z",
		"size": 28650,
		"path": "../public/assets/canvas-Bz65vXtZ.js"
	},
	"/assets/dist-Dgcf8XAL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7d-ih4CAJ8k7fYxMcaTiueUyPYorQQ\"",
		"mtime": "2026-09-19T17:22:07.774Z",
		"size": 7293,
		"path": "../public/assets/dist-Dgcf8XAL.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-09-19T14:38:29.700Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/dist-JIM9hfPA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a61b-LloM2sCpN+C+BdRUUdGINGdmkXI\"",
		"mtime": "2026-09-19T17:22:07.774Z",
		"size": 42523,
		"path": "../public/assets/dist-JIM9hfPA.js"
	},
	"/assets/kanban-BLfNu-VG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b61-zQtOVPAC7vYUtTTQ754Nr0iD0lk\"",
		"mtime": "2026-09-19T17:22:07.775Z",
		"size": 7009,
		"path": "../public/assets/kanban-BLfNu-VG.js"
	},
	"/assets/lock-DYzTZNGv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-iQoAboH1BhRBJkf+WjgkK0nyLSc\"",
		"mtime": "2026-09-19T17:22:07.776Z",
		"size": 194,
		"path": "../public/assets/lock-DYzTZNGv.js"
	},
	"/assets/login-0Aewz8Yl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1875-16aQdE01gXmSl8kMlXZcHAGdxuU\"",
		"mtime": "2026-09-19T17:22:07.777Z",
		"size": 6261,
		"path": "../public/assets/login-0Aewz8Yl.js"
	},
	"/assets/routes-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-09-19T17:22:07.779Z",
		"size": 38,
		"path": "../public/assets/routes-DJ7LAi8J.js"
	},
	"/assets/showcase-C2tx8Zk_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e90-AqjNHDMiBDuQB6XCTz7C91dls4o\"",
		"mtime": "2026-09-19T17:22:07.780Z",
		"size": 3728,
		"path": "../public/assets/showcase-C2tx8Zk_.js"
	},
	"/assets/user-CxznLb93.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8-zfpWPnj1mOB1t/aNjttb55h0waA\"",
		"mtime": "2026-09-19T17:22:07.782Z",
		"size": 184,
		"path": "../public/assets/user-CxznLb93.js"
	},
	"/assets/tabs-cQpT6lrr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d0e-sWBiJCWnSYmbywCKx4X9FLPeqS0\"",
		"mtime": "2026-09-19T17:22:07.781Z",
		"size": 7438,
		"path": "../public/assets/tabs-cQpT6lrr.js"
	},
	"/assets/useStore-BS0eX6su.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48b4-e7mWJJLx+gyAlbNR5ObhJj+mtxk\"",
		"mtime": "2026-09-19T17:22:07.782Z",
		"size": 18612,
		"path": "../public/assets/useStore-BS0eX6su.js"
	},
	"/assets/react-dom-CClnOkba.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f17-/5svCJjd5GUmlo4Sm2yeEFm+ooo\"",
		"mtime": "2026-09-19T17:22:07.778Z",
		"size": 3863,
		"path": "../public/assets/react-dom-CClnOkba.js"
	},
	"/assets/_authenticated-LLGb8E4W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e0-4jEd/CnRajqohWiwAUwThWg8PnA\"",
		"mtime": "2026-09-19T17:22:07.771Z",
		"size": 480,
		"path": "../public/assets/_authenticated-LLGb8E4W.js"
	},
	"/assets/dashboard-zzrREifN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60a4d-SxfsBREI1c310Qt8zKptuouBBek\"",
		"mtime": "2026-09-19T17:22:07.773Z",
		"size": 395853,
		"path": "../public/assets/dashboard-zzrREifN.js"
	},
	"/assets/styles-BqNfxbfm.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13ed7-njbIQg7hdg5nhBc1OKws7bb5oxc\"",
		"mtime": "2026-09-19T17:22:07.783Z",
		"size": 81623,
		"path": "../public/assets/styles-BqNfxbfm.css"
	},
	"/assets/index-lwS4I9mt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5587a-S6IKmq3UwGohFTYeP2BQaYi39pc\"",
		"mtime": "2026-09-19T17:22:07.769Z",
		"size": 350330,
		"path": "../public/assets/index-lwS4I9mt.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_As5Ixl = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_As5Ixl
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
