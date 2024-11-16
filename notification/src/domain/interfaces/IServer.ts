export interface IServerInterface {
    start(port: number): Promise<void>;
    registerRoutes(path: string, router: any): void;
    registerMiddleware(middleware: any): void;
    registerErrorHandler(middleware: any): void;
}