import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import {
  CreateBoulderInputDto,
  CreateBoulderOutputDto,
  CreateBoulderUsecase,
} from "./create-boulder.usecase";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";

interface MockBoulderGateway extends BoulderGateway {
  save: jest.Mock<Promise<Boulder | Error>, [boulder: Boulder]>;
  get: jest.Mock<Promise<Boulder | Error>, [name: string]>;
  getAll: jest.Mock<
    Promise<Boulder[] | Error>,
    [city: string, sector?: string]
  >;
  update: jest.Mock<
    Promise<void | Error>,
    [name?: string, difficulty?: number, sector?: string, city?: string]
  >;
  delete: jest.Mock<Promise<void | Error>, [ids: string]>;
}

const mockBoulderGateway: MockBoulderGateway = {
  save: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("create boulder", () => {
  let createBoulderUsecase: CreateBoulderUsecase;

  beforeEach(() => {
    createBoulderUsecase = CreateBoulderUsecase.create(mockBoulderGateway);
    mockBoulderGateway.save.mockReset();
    mockBoulderGateway.get.mockReset();
  });

  const input: CreateBoulderInputDto = {
    name: "teste",
    difficulty: 0,
    sector: "teste",
    city: "teste",
  };

  const boulder = Boulder.create(
    input.name,
    input.difficulty,
    input.sector,
    input.city,
  );

  const boulderSaved = Boulder.with({
    id: "unique-id",
    name: input.name,
    difficulty: input.difficulty,
    sector: input.sector,
    city: input.city,
    ascents: 0,
  });
  const outputGetError = new Error("boulder já cadastrado");

  it("Should be created to create a new boulder", async () => {
    const output: CreateBoulderOutputDto = {
      id: "unique-id",
      name: input.name,
      difficulty: input.difficulty,
      sector: input.sector,
      city: input.city,
      ascents: 0,
    };
    mockBoulderGateway.get.mockResolvedValueOnce(outputGetError);
    mockBoulderGateway.save.mockResolvedValueOnce(boulderSaved);

    const result = await createBoulderUsecase.execute(input);

    expect(result).toEqual(output);
    expect(mockBoulderGateway.get).toHaveBeenCalledWith(input.name);
    expect(mockBoulderGateway.save).toHaveBeenCalledWith(boulder);
  });

  it("Should not be created a existed boulder", async () => {
    mockBoulderGateway.get.mockResolvedValueOnce(boulder);
    mockBoulderGateway.save.mockResolvedValueOnce(boulderSaved);

    const result = await createBoulderUsecase.execute(input);

    expect(result).toEqual(outputGetError);
    expect(mockBoulderGateway.get).toHaveBeenCalledWith(input.name);
  });

  it("Should not be created a boulder", async () => {
    const error = new Error("erro ao criar boulder");
    mockBoulderGateway.get.mockResolvedValueOnce(outputGetError);
    mockBoulderGateway.save.mockResolvedValueOnce(error);

    const result = await createBoulderUsecase.execute(input);

    if (result instanceof Error) {
      expect(result.message).toBe("erro ao criar boulder");
    } else {
      throw new Error("Expected result to be an instance of Error");
    }

    expect(mockBoulderGateway.get).toHaveBeenCalledWith(input.name);
    expect(mockBoulderGateway.save).toHaveBeenCalledWith(boulder);
  });
});
