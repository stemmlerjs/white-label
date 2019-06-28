
import { BaseFakeRepo } from "../../../../core/tests/BaseFakeRepo";
import { Artist } from "../../../domain/artist";
import { ArtistName } from "../../../domain/artistName";
import { TraderId } from "../../../../trading/domain/traderId";
import { IArtistRepo } from "../../artistRepo";

export class FakeArtistRepo extends BaseFakeRepo<Artist> implements IArtistRepo {
  
  constructor () {
    super();
  }

  public async findById (artistId: string): Promise<Artist> {
    const matches = this._items.filter((a) => a.id.toString() === artistId);
    if (matches.length === 0) {
      return null;
    } else {
      return matches[0];
    }
  }

  public async findByArtistName (name: string): Promise<Artist> {
    const matches = this._items.filter((a) => a.name.value.toLowerCase() === name.toLowerCase());
    if (matches.length === 0) {
      return null;
    } else {
      return matches[0];
    }
  }

  public async exists (artist: Artist): Promise<boolean> {
    const found = this._items.filter((i) => this.compareFakeItems(i, artist));
    return found.length !== 0;
  }

  public async save (artist: Artist): Promise<Artist> {
    const alreadyExists = await this.exists(artist);    
    if (alreadyExists) {
      this._items.map((i) => {
        if (this.compareFakeItems(i, artist)) {
          return artist;
        } else {
          return i
        }
      })
    } else {
      this._items.push(artist);
    }
    
    return artist;
  }

  public compareFakeItems (a: Artist, b: Artist): boolean {
    return a.id.equals(b.id);
  }
}