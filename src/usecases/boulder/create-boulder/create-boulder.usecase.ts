import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";
import { Usecase } from "@/usecases/usecase";

export type CreateBoulderInputDto = {
  name: string;
  difficulty: number;
  sector: string;
  city: string;
};

export type CreateBoulderOutputDto = {
  id: string;
};

export class CreateBoulderUsecase
  implements Usecase<CreateBoulderInputDto, CreateBoulderOutputDto>
{
  private constructor(private readonly boulderGateway: BoulderGateway) {}

  public static create(boulderGateway: BoulderGateway) {
    return new CreateBoulderUsecase(boulderGateway);
  }

  public async execute({
    name,
    difficulty,
    sector,
    city,
  }: CreateBoulderInputDto): Promise<CreateBoulderOutputDto | Error> {
    const boulder = Boulder.create(name, difficulty, sector, city); // REVISAR A CRIAÇÃO
    try {
      // primeiro deve buscar se existe no banco
      const savedBoulder = await this.boulderGateway.save(boulder);
      if (savedBoulder instanceof Error) {
        return new Error(savedBoulder.message);
      }
      return this.presentOutput(savedBoulder);
    } catch (error) {
      return new Error("erro ao criar boulder");
    }
  }

  private presentOutput(boulder: Boulder): CreateBoulderOutputDto {
    // MELHORAR OS PRESENTERS (camada)
    const output: CreateBoulderOutputDto = {
      id: boulder.id || "",
    };

    return output;
  }
}
