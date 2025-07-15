import { Application, Router } from "express";
import { AuthRouter } from "./auth/authRoutes";

const _routes: Array<[string, Router]> = [["/auth", AuthRouter]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
