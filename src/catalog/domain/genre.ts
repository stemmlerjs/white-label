import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/Result";

interface GenreProps {
  value: string;
}

export class Genre extends Entity<GenreProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  
  private constructor (props: GenreProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (name: string, id?: UniqueEntityID): Result<Genre> {
    if (!!name === false || name.length === 0) {
      return Result.fail<Genre>('Must provide a genre name')
    } else {
      return Result.ok<Genre>(new Genre({ value: name }, id))
    }
  }
}

