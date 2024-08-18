import {
  GetAllBouldersoutputDto,
  GetAllBouldersUsecase,
} from "@/usecases/boulder/getAll-boulders/getAll-boulders.usecase";
import { httpMethod, Route } from "../route";
import { Request, Response } from "express";

export class GetAllBouldersRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: httpMethod,
    private readonly getAllBouldersService: GetAllBouldersUsecase,
  ) {}

  public static create(getAllBouldersService: GetAllBouldersUsecase) {
    return new GetAllBouldersRoute(
      `${process.env.API_BASE_PATH}/boulders`,
      httpMethod.GET,
      getAllBouldersService,
    );
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const input = request.body;
      const output = await this.getAllBouldersService.execute(input);
      if (output instanceof Error) {
        response.status(400).json(output.message).send();
      } else {
        const responseBody = this.present(output);
        response.status(200).json(responseBody).send();
      }
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): httpMethod {
    return this.method;
  }

  private present(output: GetAllBouldersoutputDto) {
    const response: GetAllBouldersoutputDto = {
      boulders: output.boulders.map((boulder) => {
        return {
          name: boulder.name,
          difficulty: boulder.difficulty,
          sector: boulder.sector,
          city: boulder.city,
          ascents: boulder.ascents,
        };
      }),
    };

    return response;
  }
}
