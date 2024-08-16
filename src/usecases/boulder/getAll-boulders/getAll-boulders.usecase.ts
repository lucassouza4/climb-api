import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";
import { Usecase } from "@/usecases/usecase";

export type GetAllBouldersInputDto = {
  city: string;
  sector?: string;
};

export type GetAllBouldersoutputDto = {
  boulders: {
    name: string;
    difficulty: number;
    sector: string;
    city: string;
    ascents: number;
  }[];
};

export class GetAllBouldersUsecase
  implements Usecase<GetAllBouldersInputDto, GetAllBouldersoutputDto>
{
  private constructor(private readonly boulderGateway: BoulderGateway) {}

  public static create(boulderGateway: BoulderGateway) {
    return new GetAllBouldersUsecase(boulderGateway);
  }

  public async execute(
    input: GetAllBouldersInputDto,
  ): Promise<GetAllBouldersoutputDto | Error> {
    const boulders = await this.boulderGateway.getAll(input.city, input.sector);
    if (boulders instanceof Error) {
      return new Error(boulders.message);
    }
    return this.presentOutput(boulders);
  }

  private presentOutput(boulders: Boulder[]): GetAllBouldersoutputDto {
    const output: GetAllBouldersoutputDto = {
      boulders: boulders.map((boulder) => {
        return {
          name: boulder.name,
          difficulty: boulder.difficulty,
          sector: boulder.sector,
          city: boulder.city,
          ascents: boulder.ascents,
        };
      }),
    };

    return output;
  }
}
