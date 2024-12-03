"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_express_1 = require("./infra/api/express/api.express");
const create_boulder_express_route_1 = require("./infra/api/express/routes/boulder/create-boulder.express.route");
const get_boulder_express_route_1 = require("./infra/api/express/routes/boulder/get-boulder.express.route");
const boulder_repository_prisma_1 = require("./infra/repositories/boulder/boulder.repository.prisma");
const prisma_1 = require("./package/prisma/prisma");
const create_boulder_usecase_1 = require("./usecases/boulder/create-boulder/create-boulder.usecase");
const get_boulder_usecase_1 = require("./usecases/boulder/get-boulder/get-boulder.usecase");
//factory
function main() {
    const repository = boulder_repository_prisma_1.boulderRepositoryPrisma.create(prisma_1.prisma);
    const createBoulderUsecase = create_boulder_usecase_1.CreateBoulderUsecase.create(repository);
    const getBoulderUsecase = get_boulder_usecase_1.GetBoulderUsecase.create(repository);
    const createRoute = create_boulder_express_route_1.CreateBoulderRoute.create(createBoulderUsecase);
    const getRoute = get_boulder_express_route_1.GetBoulderRoute.create(getBoulderUsecase);
    const api = api_express_1.ApiExpress.create([createRoute, getRoute]);
    const port = 3000;
    api.start(port);
}
main();
//# sourceMappingURL=index.js.map