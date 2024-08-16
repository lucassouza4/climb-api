import { ApiExpress } from "./infra/api/express/api.express";
import { CreateBoulderRoute } from "./infra/api/express/routes/boulder/create-boulder.express.route";
import { GetBoulderRoute } from "./infra/api/express/routes/boulder/get-boulder.express.route";
import { GetAllBouldersRoute } from "./infra/api/express/routes/boulder/getAll-boulders.express.route";
import { boulderRepositoryPrisma } from "./infra/repositories/boulder/boulder.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateBoulderUsecase } from "./usecases/boulder/create-boulder/create-boulder.usecase";
import { GetBoulderUsecase } from "./usecases/boulder/get-boulder/get-boulder.usecase";
import { GetAllBouldersUsecase } from "./usecases/boulder/getAll-boulders/getAll-boulders.usecase";

//factory

function main() {
  const repository = boulderRepositoryPrisma.create(prisma);
  const createBoulderUsecase = CreateBoulderUsecase.create(repository);
  const getBoulderUsecase = GetBoulderUsecase.create(repository);
  const getAllBoulderUsecase = GetAllBouldersUsecase.create(repository);

  const createRoute = CreateBoulderRoute.create(createBoulderUsecase);
  const getRoute = GetBoulderRoute.create(getBoulderUsecase);
  const getAllRoute = GetAllBouldersRoute.create(getAllBoulderUsecase);

  const api = ApiExpress.create([createRoute, getRoute, getAllRoute]);

  const port = 3000;
  api.start(port);
}

main();
