
import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/Result";
import { Genre } from "./genre";
import { Guard } from "../../core/Guard";
import { ArtistName } from "./artistName";

interface ArtistProps {
  name: ArtistName;
  genres: Genre[];
}

export class Artist extends Entity<ArtistProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name (): ArtistName {
    return this.props.name;
  }
  
  private constructor (props: ArtistProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: ArtistProps, id?: UniqueEntityID): Result<Artist> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.genres, argumentName: 'genres' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Artist>(guardResult.message)
    } else {
      return Result.ok<Artist>(new Artist({
        ...props,
        genres: Array.isArray(props.genres) ? props.genres : []
      }, id));
    }
  }
}

