import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";
import { PrismaClient } from "@prisma/client";

//implementar prisma model

export class boulderRepositoryPrisma implements BoulderGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new boulderRepositoryPrisma(prismaClient);
  }

  public async save(boulder: Boulder): Promise<Boulder | Error> {
    const data = {
      name: boulder.name,
      difficulty: boulder.difficulty,
      sector: boulder.sector,
      city: boulder.city,
      ascents: boulder.ascents,
    };

    try {
      const boulder = await this.prismaClient.boulder.create({
        data,
      });
      return Boulder.with({
        id: boulder.id,
        name: boulder.name,
        difficulty: boulder.difficulty,
        sector: boulder.sector,
        city: boulder.city,
        ascents: boulder.ascents,
      });
    } catch {
      return new Error("Não foi possível salvar no banco");
    }
  }

  public async get(name: string): Promise<Boulder | Error> {
    try {
      const boulder = await this.prismaClient.boulder.findFirst({
        where: { name: name },
      });
      if (boulder) {
        return Boulder.with({
          id: boulder.id,
          name: boulder.name,
          difficulty: boulder.difficulty,
          sector: boulder.sector,
          city: boulder.city,
          ascents: boulder.ascents,
        });
      } else return new Error("Busca sem retorno");
    } catch {
      return new Error("Não foi possivel buscar");
    }
  }

  public async getAll(
    city: string,
    sector?: string,
  ): Promise<Boulder[] | Error> {
    try {
      const boulders = await this.prismaClient.boulder.findMany({
        where: { city: city, sector: sector },
      });
      if (boulders) {
        const bouldersList = boulders.map((boulder) => {
          return Boulder.with({
            id: boulder.id,
            name: boulder.name,
            difficulty: boulder.difficulty,
            sector: boulder.sector,
            city: boulder.city,
            ascents: boulder.ascents,
          });
        });
        return bouldersList;
      } else {
        return new Error("Busca sem retorno");
      }
    } catch {
      return new Error("Não foi possivel buscar");
    }
  }

  public async update(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string,
  ): Promise<void | Error> {
    return new Error(`${name}, ${difficulty}, ${sector}, ${city}`);
  }
  public async delete(id: string): Promise<void | Error> {
    return new Error(`${id}`);
  }
}
