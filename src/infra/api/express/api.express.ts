import { Api } from "../api";
import * as express from "express";
import { Express } from "express";
import * as swaggerUi from "swagger-ui-express";
import * as yaml from "yamljs";

import { Route } from "./routes/route";

interface RouteInfo {
  route: {
    path: string;
    stack: { method: string }[];
  };
}

export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
    if (process.env.NODE_ENV === "development") {
      const swaggerDocument = yaml.load("./swagger.yaml");
      this.app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument),
      );
    }
  }

  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      if (method in this.app) {
        this.app[method](path, handler);
      } else {
        throw new Error(`Method ${method} is not supported`);
      }
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      if (process.env.NODE_ENV == "development")
        console.log(
          `Swagger docs available at http://localhost:${port}/api-docs`,
        );
      this.listRoutes();
    });
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: RouteInfo) => route.route)
      .map((route: RouteInfo) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });
    console.log(routes);
  }
}
