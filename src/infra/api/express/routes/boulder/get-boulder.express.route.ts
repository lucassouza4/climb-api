import {
  GetBoulderOutputDto,
  GetBoulderUsecase,
} from "@/usecases/boulder/get-boulder/get-boulder.usecase";
import { httpMethod, Route } from "../route";
import { Request, Response } from "express";

export class GetBoulderRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: httpMethod,
    private readonly getBoulderService: GetBoulderUsecase,
  ) {}

  public static create(getBoulderService: GetBoulderUsecase) {
    return new GetBoulderRoute(
      `${process.env.API_BASE_PATH}/boulders/search`,
      httpMethod.GET,
      getBoulderService,
    );
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const input = request.body;
      const output = await this.getBoulderService.execute(input);
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

  private present(input: GetBoulderOutputDto) {
    const response = {
      name: input.name,
      difficulty: input.difficulty,
      sector: input.sector,
      city: input.city,
      ascents: input.ascents,
    };

    return response;
  }
}
