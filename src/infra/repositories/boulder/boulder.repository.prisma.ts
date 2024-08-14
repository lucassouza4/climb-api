import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";
import { PrismaClient } from "@prisma/client";

//implementar prisma model

export class boulderRepositoryPrisma implements BoulderGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new boulderRepositoryPrisma(prismaClient);
  }

  public async save(boulder: Boulder): Promise<void> {
    const data = {
      key: boulder.key,
      name: boulder.name,
      difficulty: boulder.difficulty,
      sector: boulder.sector,
      city: boulder.city,
      ascensions: boulder.ascensions,
    };

    try {
      await this.prismaClient.boulder.create({
        data,
      });
    } catch (error) {
      throw new Error("Não foi possível salvar no banco");
    }
  }

  public async get(key: string): Promise<Boulder> {
    try {
      const boulder = await this.prismaClient.boulder.findUnique({
        where: { key: key },
      });
      return Boulder.with({
        name: boulder?.name || "",
        difficulty: boulder?.difficulty || 0,
        sector: boulder?.sector || "",
        city: boulder?.city || "",
        key: boulder?.key || "",
        ascensions: boulder?.ascensions || 0,
      });
    } catch (error) {
      throw new Error("Não foi possível buscar no banco");
    }
  }

  public async getAll(
    name?: string,
    city?: string,
    sector?: string,
  ): Promise<Boulder[]> {
    throw new Error(`${name}, ${city}, ${sector}`);
  }

  public async update(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string,
  ): Promise<void> {
    throw new Error(`${name}, ${difficulty}, ${sector}, ${city}`);
  }
  public async delete(id: string): Promise<void> {
    throw new Error(`${id}`);
  }
}
