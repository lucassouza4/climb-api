import { randomUUID } from "crypto";

export type BoulderProps = {
  key: string;
  name: string;
  difficulty: number;
  sector: string;
  city: string;
  ascensions: number;
};
export class Boulder {
  private constructor(private props: BoulderProps) {
    this.validade();
  }

  public static create(
    name: string,
    difficulty: number,
    sector: string,
    city: string,
    key?: string,
  ) {
    return new Boulder({
      key: key || randomUUID().toString(),
      name,
      difficulty,
      sector,
      city,
      ascensions: 0,
    });
  }

  private validade() {
    if (
      this.props.name == null ||
      this.props.sector == null ||
      this.props.city == null
    ) {
      throw new Error("name, sector e city precisam ser fornecidos");
    }
    if (this.props.difficulty < 0) {
      throw new Error("A difficulty do bulder deve ser maior ou igual a V0");
    }
  }

  public static with(props: BoulderProps) {
    return new Boulder(props);
  }

  public get key() {
    return this.props.key;
  }

  public get name() {
    return this.props.name;
  }

  public get difficulty() {
    return this.props.difficulty;
  }

  public get sector() {
    return this.props.sector;
  }

  public get city() {
    return this.props.city;
  }

  public get ascensions() {
    return this.props.ascensions;
  }

  public increaseAscensions() {
    this.props.ascensions += 1;
  }

  public decreaseAscensions() {
    this.props.ascensions -= 1;
  }
}
