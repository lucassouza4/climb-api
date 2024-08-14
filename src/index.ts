import { ApiExpress } from "./infra/api/express/api.express";
import { CreateBoulderRoute } from "./infra/api/express/routes/boulder/create-boulder.express.route";
import { GetBoulderRoute } from "./infra/api/express/routes/boulder/get-boulder.express.route";
import { boulderRepositoryPrisma } from "./infra/repositories/boulder/boulder.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateBoulderUsecase } from "./usecases/boulder/create-boulder/create-boulder.usecase";
import { GetBoulderUsecase } from "./usecases/boulder/get-boulder/get-boulder.usecase";

//factory

function main() {
  const repository = boulderRepositoryPrisma.create(prisma);
  const createBoulderUsecase = CreateBoulderUsecase.create(repository);
  const getBoulderUsecase = GetBoulderUsecase.create(repository);

  const createRoute = CreateBoulderRoute.create(createBoulderUsecase);
  const getRoute = GetBoulderRoute.create(getBoulderUsecase);

  const api = ApiExpress.create([createRoute, getRoute]);

  const port = 3000;
  api.start(port);
}

main();
