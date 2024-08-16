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
    } catch (error) {
      return new Error("Não foi possível salvar no banco");
    }
  }

  public async get(id: string): Promise<Boulder | Error> {
    try {
      const boulder = await this.prismaClient.boulder.findUnique({
        where: { id: id },
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
    } catch (error) {
      return new Error("Não foi possivel buscar");
    }
  }

  public async getAll(
    name?: string,
    city?: string,
    sector?: string,
  ): Promise<Boulder[] | Error> {
    return new Error(`${name}, ${city}, ${sector}`);
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
