export type BoulderProps = {
  name: string;
  difficulty: number;
  sector: string;
  city: string;
  ascents: number;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  ) {
    return new Boulder({
      name,
      difficulty,
      sector,
      city,
      ascents: 0,
    });
  }

  private validade() {
    if (
      this.props.name == null ||
      this.props.sector == null ||
      this.props.city == null
    ) {
      return new Error("name, sector e city precisam ser fornecidos");
    }
    if (this.props.difficulty < 0) {
      return new Error("A difficulty do bulder deve ser maior ou igual a V0");
    }
  }

  public static with(props: BoulderProps) {
    return new Boulder(props);
  }

  public get id() {
    return this.props.id;
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

  public get ascents() {
    return this.props.ascents;
  }

  public increaseascents() {
    this.props.ascents += 1;
  }

  public decreaseascents() {
    this.props.ascents -= 1;
  }
}
