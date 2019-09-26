
import { Mapper } from "../../../core/infra/Mapper";
import { Album } from "../domain/album";
import { ArtistId } from "../domain/artistId";

export class AlbumMap extends Mapper<Album> {
  public static toDomain (raw: any): Album {
    const albumOrError = Album.create({
      artistId: ArtistId.create(raw.artist_id),
      name: raw.name,
      artwork: raw.artwork,
      yearReleased: raw.year_released
    });

    albumOrError.isFailure ? console.log(albumOrError.error) : '';

    return albumOrError.isSuccess ? albumOrError.getValue() : null;
  }

  public static toPersistence (album: Album): any {
    return {
      album_id: album.id.toString(),
      artist_id: album.artistId.id.toString(),
      name: album.name,
      year_released: album.yearReleased,
      artwork: album.artwork
    }
  }
}