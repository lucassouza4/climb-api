import { Boulder } from "../entity/boulder.entity";

export interface BoulderGateway {
  save(boulder: Boulder): Promise<Boulder | Error>;
  get(name: string): Promise<Boulder | Error>;
  getAll(city: string, sector?: string): Promise<Boulder[] | Error>;
  update(
    name?: string,
    difficulty?: number,
    sector?: string,
    city?: string,
  ): Promise<void | Error>;
  delete(ids: string): Promise<void | Error>;
}
