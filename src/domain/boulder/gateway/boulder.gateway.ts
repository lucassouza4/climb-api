import { Boulder } from "../entity/boulder.entity";

export interface BoulderGateway {
  save(boulder: Boulder): Promise<void>;
  get(key: string): Promise<Boulder>;
  getAll(name?: string, city?: string, sector?: string): Promise<Boulder[]>;
  update(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string,
  ): Promise<void>;
  delete(key: string): Promise<void>;
}
