"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express = require("express");
const bodyParser = require("body-parser");
class ApiExpress {
    constructor(routes) {
        this.app = express();
        this.app.use(bodyParser.json());
        this.addRoutes(routes);
    }
    static create(routes) {
        return new ApiExpress(routes);
    }
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            if (method in this.app) {
                this.app[method](path, handler);
            }
            else {
                throw new Error(`Method ${method} is not supported`);
            }
        });
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            this.listRoutes();
        });
    }
    listRoutes() {
        const routes = this.app._router.stack
            .filter((route) => route.route)
            .map((route) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method,
            };
        });
        console.log(routes);
    }
}
exports.ApiExpress = ApiExpress;
//# sourceMappingURL=api.express.js.map