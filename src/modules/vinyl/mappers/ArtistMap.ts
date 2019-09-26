import { Mapper } from "../../../core/infra/Mapper";
import { Artist } from "../domain/artist";
import { ArtistName } from "../domain/artistName";
import { GenreMap } from "./GenreMap";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";

export class ArtistMap extends Mapper<Artist> {
  public static toDomain (raw: any): Artist {
    const artistOrError = Artist.create({
      name: ArtistName.create(raw.artist_name).getValue(),
      genres: raw.Genres.map((g) => GenreMap.toDomain(g))
    }, new UniqueEntityID(raw.artist_id));

    artistOrError.isFailure ? console.log(artistOrError.error): '';

    return artistOrError.isSuccess ? artistOrError.getValue() : null;
  }

  public static toPersistence (artist: Artist): any {
    return {
      artist_id: artist.artistId.id.toString(),
      artist_name: artist.name.value
    }
  }
}