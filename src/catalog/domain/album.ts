import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/Result";
import { Guard } from "../../core/Guard";
import { ArtistId } from "./artistId";
import { Genre } from "./genre";
import { AlbumId } from "./albumId";

interface AlbumProps {
  name: string;
  artistId: ArtistId;
  yearReleased?: number;
  genres?: Genre[];
  artwork?: string;
}

export class Album extends Entity<AlbumProps> {
  public static MAX_NUMBER_GENRES_PER_ALBUM = 3;

  get id (): UniqueEntityID {
    return this._id
  }

  get albumId (): AlbumId {
    return AlbumId.create(this.id);
  }

  get name (): string {
    return this.props.name
  }

  get genres (): Genre[] {
    return this.props.genres;
  }

  get yearReleased (): number {
    return this.props.yearReleased;
  }

  get artwork (): string {
    return this.props.artwork;
  }

  public addGenre (genre: Genre): void {
    const maxLengthExceeded = this.props.genres
      .length >= Album.MAX_NUMBER_GENRES_PER_ALBUM;

    const alreadyAdded = this.props.genres
      .find((g) => g.id.equals(genre.id));

    if (!alreadyAdded && !maxLengthExceeded) {
      this.props.genres.push(genre);
    }
  }

  public removeGenre (genre: Genre): void {
    this.props.genres = this.props.genres
      .filter((g) => !g.id.equals(genre.id));
  }
  
  private constructor (props: AlbumProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: AlbumProps, id?: UniqueEntityID): Result<Album> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.artistId, argumentName: 'artistId' }
    ])

    if (!guardResult.succeeded) {
      return Result.fail<Album>(guardResult.message)
    } else {
      return Result.ok<Album>(new Album({
        ...props,
        genres: props.genres ? props.genres : []
      }, id));
    }
  }
}