
import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";

interface ArtistNameProps {
  value: string;
}

export class ArtistName extends ValueObject<ArtistNameProps> {
  get value (): string {
    return this.props.value;
  }

  private constructor (props: ArtistNameProps) {
    super(props);
  }

  public static create (name: string): Result<ArtistName> {
    if (!!name === false || name.length === 0) {
      return Result.fail<ArtistName>('Must provide an artist name')
    } else {
      return Result.ok<ArtistName>(new ArtistName({ value: name }))
    }
  }
}