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
  }: CreateBoulderInputDto): Promise<CreateBoulderOutputDto> {
    const boulder = Boulder.create(name, difficulty, sector, city); // REVISAR A CRIAÇÃO
    try {
      // primeiro deve buscar se existe no banco
      await this.boulderGateway.save(boulder);
    } catch (error) {
      throw new Error("erro ao criar boulder");
    }

    const output = this.presentOutput(boulder);

    return output;
  }

  private presentOutput(boulder: Boulder | undefined): CreateBoulderOutputDto {
    // MELHORAR OS PRESENTERS (camada)
    const output: CreateBoulderOutputDto = {
      id: boulder?.key || "",
    };

    return output;
  }
}
