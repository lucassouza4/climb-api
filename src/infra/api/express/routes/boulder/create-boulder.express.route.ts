import { Request, Response } from "express";
import { httpMethod, Route } from "../route";
import {
  CreateBoulderInputDto,
  CreateBoulderOutputDto,
  CreateBoulderUsecase,
} from "@/usecases/boulder/create-boulder/create-boulder.usecase";

export type CreateBoulderResponseDto = {
  id: string;
};

export class CreateBoulderRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: httpMethod,
    private readonly createBoulderService: CreateBoulderUsecase,
  ) {}

  public static create(createBoulderService: CreateBoulderUsecase) {
    return new CreateBoulderRoute(
      `${process.env.API_BASE_PATH}/boulders`,
      httpMethod.POST,
      createBoulderService,
    );
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      const { name, difficulty, sector, city } = request.body;

      const input: CreateBoulderInputDto = {
        name,
        difficulty,
        sector,
        city,
      };

      const output = await this.createBoulderService.execute(input);
      if (output instanceof Error) {
        response.status(400).json(output.message).send();
      } else {
        const responseBody = this.present(output);
        response.status(201).json(responseBody).send();
      }
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): httpMethod {
    return this.method;
  }

  private present(input: CreateBoulderOutputDto): CreateBoulderOutputDto {
    const response = {
      id: input.id,
      name: input.name,
      difficulty: input.difficulty,
      city: input.city,
      sector: input.sector,
      ascents: input.ascents,
    };
    return response;
  }
}
