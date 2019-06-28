
import { IVinylRepo } from "../../vinylRepo";
import { BaseFakeRepo } from "../../../../core/tests/BaseFakeRepo";
import { Vinyl } from "../../../domain/vinyl";

export class FakeVinylRepo extends BaseFakeRepo<Vinyl> implements IVinylRepo {

  constructor () {
    super();
  }

  public async getVinylCollection (traderId: string): Promise<Vinyl[]> {
    return this._items.filter((i) => i.traderId.id.toString() === traderId);
  }

  public async exists (vinyl: Vinyl): Promise<boolean> {
    const found = this._items.filter((i) => this.compareFakeItems(i, vinyl));
    return found.length !== 0;
  }

  public async save (vinyl: Vinyl): Promise<Vinyl> {
    const alreadyExists = await this.exists(vinyl);

    if (alreadyExists) {
      this._items.map((i) => {
        if (this.compareFakeItems(i, vinyl)) {
          return vinyl;
        } else {
          return i
        }
      })
    } else {
      this._items.push(vinyl);
    }
    
    return vinyl;
  }

  public compareFakeItems (a: Vinyl, b: Vinyl): boolean {
    return a.id.equals(b.id);
  }
}