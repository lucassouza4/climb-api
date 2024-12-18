import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";
import { Usecase } from "@/usecases/usecase";

export type GetBoulderInputDto = {
  name: string;
};
export type GetBoulderOutputDto = {
  id: string;
  name: string;
  difficulty: number;
  sector: string;
  city: string;
  ascents: number;
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
  ): Promise<GetBoulderOutputDto | Error> {
    const boulder = await this.boulderGateway.get(input.name);
    if (boulder instanceof Error) {
      return new Error(boulder.message);
    }
    return this.presentOutput(boulder);
  }

  private presentOutput(boulder: Boulder): GetBoulderOutputDto {
    const output: GetBoulderOutputDto = {
      id: boulder.id || "",
      name: boulder.name,
      difficulty: boulder.difficulty,
      sector: boulder.sector,
      city: boulder.city,
      ascents: boulder.ascents,
    };
    return output;
  }
}
