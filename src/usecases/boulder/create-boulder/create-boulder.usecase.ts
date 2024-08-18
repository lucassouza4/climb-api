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
  name: string;
  difficulty: number;
  sector: string;
  city: string;
};

export class CreateBoulderUsecase
  implements Usecase<CreateBoulderInputDto, CreateBoulderOutputDto>
{
  private constructor(private readonly boulderGateway: BoulderGateway) {}

  public static create(boulderGateway: BoulderGateway) {
    return new CreateBoulderUsecase(boulderGateway);
  }

  public async execute(
    input: CreateBoulderInputDto,
  ): Promise<CreateBoulderOutputDto | Error> {
    const boulder = Boulder.create(
      input.name,
      input.difficulty,
      input.sector,
      input.city,
    );
    try {
      const boulderFinded = await this.boulderGateway.get(input.name);
      if (boulderFinded instanceof Error) {
        const savedBoulder = await this.boulderGateway.save(boulder);
        if (savedBoulder instanceof Error) {
          return new Error(savedBoulder.message);
        }
        return this.presentOutput(savedBoulder);
      }
      return new Error("boulder já cadastrado");
    } catch {
      return new Error("erro ao criar boulder");
    }
  }

  private presentOutput(boulder: Boulder): CreateBoulderOutputDto {
    // MELHORAR OS PRESENTERS (camada)
    const output: CreateBoulderOutputDto = {
      id: boulder.id || "",
      name: boulder.name,
      difficulty: boulder.difficulty,
      city: boulder.city,
      sector: boulder.sector,
    };

    return output;
  }
}
