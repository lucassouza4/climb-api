import { Boulder } from "@/domain/boulder/entity/boulder.entity";
import { BoulderGateway } from "@/domain/boulder/gateway/boulder.gateway";

export interface MockBoulderGateway extends BoulderGateway {
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

export const mockBoulderGateway: MockBoulderGateway = {
  save: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
