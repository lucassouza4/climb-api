import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";
import { Usecase } from "@/usecases/usecase";

export type GetBoulderInputDto = {
  id: string;
};
export type GetBoulderOutputDto = {
  id: string;
  name: string;
  difficulty: number;
  sector: string;
  city: string;
  ascensions: number;
};

export class GetBoulderUsecase
  implements Usecase<GetBoulderInputDto, GetBoulderOutputDto>
{
  private constructor(private readonly boulderGateway: BoulderGateway) {}

  public static create(boulderGateway: BoulderGateway) {
    return new GetBoulderUsecase(boulderGateway);
  }

  public async execute(
    input: GetBoulderInputDto,
  ): Promise<GetBoulderOutputDto> {
    let boulder;
    try {
      boulder = await this.boulderGateway.get(input.id);
    } catch (error) {
      throw new Error("erro ao buscar boulder");
    }
    const output = this.presentOutput(boulder);
    return output;
  }

  private presentOutput(boulder: Boulder | undefined): GetBoulderOutputDto {
    const output: GetBoulderOutputDto = {
      id: boulder?.key || "",
      name: boulder?.name || "",
      difficulty: boulder?.difficulty || 0,
      sector: boulder?.sector || "",
      city: boulder?.city || "",
      ascensions: boulder?.ascensions || 0,
    };
    return output;
  }
}
