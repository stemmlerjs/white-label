import { Mapper } from "../../../core/infra/Mapper";
import { Genre } from "../domain/genre";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";

export class GenreMap extends Mapper<Genre> {
  public static toDomain (raw: any): Genre {
    const genreOrError = Genre.create(
      raw.name,
      new UniqueEntityID(raw.genre_id)
    );

    genreOrError.isFailure ? console.log(genreOrError.error) : '';

    return genreOrError.isSuccess ? genreOrError.getValue() : null;
  }

  public static toPersistence (genre: Genre): any {
    return {
      genre_id: genre.genreId.id.toString(),
      name: genre.value
    }
  }
}