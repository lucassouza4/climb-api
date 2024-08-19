import { mockBoulderGateway } from "@/package/prisma/prisma-mock";
import {
  GetBoulderInputDto,
  GetBoulderOutputDto,
  GetBoulderUsecase,
} from "./get-boulder.usecase";
import { Boulder } from "@/domain/boulder/entity/boulder.entity";

describe("get boulder", () => {
  let getBoulderUsecase: GetBoulderUsecase;

  beforeEach(() => {
    getBoulderUsecase = GetBoulderUsecase.create(mockBoulderGateway);
    mockBoulderGateway.get.mockReset();
  });

  const input: GetBoulderInputDto = {
    name: "teste",
  };

  const boulder = Boulder.with({
    id: "unique-id",
    name: input.name,
    difficulty: 0,
    sector: "teste",
    city: "teste",
    ascents: 0,
  });

  it("Should get a boulder", async () => {
    const output: GetBoulderOutputDto = {
      id: "unique-id",
      name: input.name,
      difficulty: 0,
      sector: "teste",
      city: "teste",
      ascents: 0,
    };

    mockBoulderGateway.get.mockResolvedValueOnce(boulder);

    const result = await getBoulderUsecase.execute(input);

    expect(result).toEqual(output);
    expect(mockBoulderGateway.get).toHaveBeenCalledWith(input.name);
  });

  it("Should not get a boulder", async () => {
    const GetError = new Error("boulder não encontrado");

    mockBoulderGateway.get.mockResolvedValueOnce(GetError);

    const result = await getBoulderUsecase.execute(input);

    if (result instanceof Error) {
      expect(result.message).toBe(GetError.message);
    } else {
      throw new Error("Expected result to be an instance of Error");
    }
    expect(mockBoulderGateway.get).toHaveBeenCalledWith(input.name);
  });
});
