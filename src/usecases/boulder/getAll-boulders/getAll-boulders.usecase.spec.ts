import { mockBoulderGateway } from "@/package/prisma/prisma-mock";
import {
  GetAllBouldersInputDto,
  GetAllBouldersoutputDto,
  GetAllBouldersUsecase,
} from "./getAll-boulders.usecase";
import { Boulder } from "@/domain/boulder/entity/boulder.entity";

describe("get all boulders", () => {
  let getAllBouldersUsecase: GetAllBouldersUsecase;

  beforeEach(() => {
    getAllBouldersUsecase = GetAllBouldersUsecase.create(mockBoulderGateway);
    mockBoulderGateway.getAll.mockReset();
  });

  const input: GetAllBouldersInputDto = {
    city: "teste",
    sector: "teste",
  };

  const boulders = [
    Boulder.with({
      id: "unique-id",
      name: "test",
      difficulty: 0,
      sector: input.sector || "",
      city: input.city || "",
      ascents: 0,
    }),
    Boulder.with({
      id: "unique-id2",
      name: "test2",
      difficulty: 0,
      sector: input.sector || "",
      city: input.city || "",
      ascents: 0,
    }),
  ];

  it("Should get all boulders", async () => {
    const output: GetAllBouldersoutputDto = {
      boulders: boulders.map((boulder) => {
        return {
          id: boulder.id || "",
          name: boulder.name,
          difficulty: boulder.difficulty,
          sector: boulder.sector,
          city: boulder.city,
          ascents: boulder.ascents,
        };
      }),
    };

    mockBoulderGateway.getAll.mockResolvedValueOnce(boulders);

    const result = await getAllBouldersUsecase.execute(input);

    expect(result).toEqual(output);
    expect(mockBoulderGateway.getAll).toHaveBeenCalledWith(
      input.city,
      input.sector,
    );
  });
});
