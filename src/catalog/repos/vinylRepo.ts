import { Repo } from "../../core/infra/Repo";
import { Vinyl } from "../domain/vinyl";
import { VinylId } from "../domain/vinylId";

export interface IVinylRepo extends Repo<Vinyl> {
  getVinylById (vinylId: VinylId): Promise<Vinyl>;
  getVinylCollection (traderId: string): Promise<Vinyl[]>;
}

export class VinylRepo implements IVinylRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  public getVinylById (): Promise<Vinyl> {
    return null;
  }

  public async exists (): Promise<boolean> {
    return false;
  }

  public async save (vinyl: Vinyl): Promise<Vinyl> {
    return null;
  }

  public async getVinylCollection (traderId: string): Promise<Vinyl[]> {
    return null;
  }
}