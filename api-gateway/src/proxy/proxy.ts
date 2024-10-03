import { Application, json } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

export const setupProxies = (app: Application, routes: any[]) => {
    routes.forEach(routes => {
        const proxyMiddleware: RequestHandler = createProxyMiddleware({
            target: routes.proxy.target,
            changeOrigin: routes.proxy.changeOrigin,
            on: {
                proxyReq: (proxyReq, req: any, res) => {
                    if (req.user) {
                        proxyReq.setHeader('X-User-Data', JSON.stringify(req.user));
                    }else if(req.admin) {
                        proxyReq.setHeader('X-Admin-Data', JSON.stringify(req.admin))
                    }
                }
            }
        });
        app.use(routes.url, proxyMiddleware);
    });
};
