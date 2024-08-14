import { GetBoulderUsecase } from "@/usecases/boulder/get-boulder/get-boulder.usecase";
import { httpMethod, Route } from "../route";
import { Request, Response } from "express";

export type GetBoulderOutputDto = {
  id: string;
  name: string;
  difficulty: number;
  sector: string;
  city: string;
  ascensions: number;
};

export class GetBoulderRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: httpMethod,
    private readonly getBoulderService: GetBoulderUsecase,
  ) {}

  public static create(getBoulderService: GetBoulderUsecase) {
    return new GetBoulderRoute("/boulders", httpMethod.GET, getBoulderService);
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const input = request.body;

      try {
        const output = await this.getBoulderService.execute(input);
        const responseBody = this.present(output);

        response.status(200).json(responseBody).send();
      } catch (error) {
        response.status(404).send();
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
      id: input.id,
      name: input.name,
      difficulty: input.difficulty,
      sector: input.sector,
      city: input.city,
      ascensions: input.ascensions,
    };

    return response;
  }
}
