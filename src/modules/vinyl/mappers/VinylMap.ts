import { Mapper } from "../../../core/infra/Mapper";
import { Vinyl } from "../domain/vinyl";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { ArtistMap } from "./ArtistMap";
import { AlbumMap } from "./AlbumMap";
import { TraderId } from "../../trading/domain/traderId";

export class VinylMap extends Mapper<Vinyl> {
  public static toDomain (raw: any): Vinyl {
    const vinylOrError = Vinyl.create({
      traderId: TraderId.create(raw.trader_id),
      artist: ArtistMap.toDomain(raw.Artist),
      album: AlbumMap.toDomain(raw.Album)
    }, new UniqueEntityID(raw.vinyl_id));

    vinylOrError.isFailure ? console.log(vinylOrError) : '';

    return vinylOrError.isSuccess ? vinylOrError.getValue() : null;
  }

  public static toPersistence (vinyl: Vinyl): any {
    return {
      vinyl_id: vinyl.id.toString(),
      artist_id: vinyl.artist.artistId.id.toString(),
      album_id: vinyl.album.id.toString(),
      notes: vinyl.vinylNotes.value
    }
  }
}