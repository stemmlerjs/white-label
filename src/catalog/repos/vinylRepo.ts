import { Repo } from "../../core/infra/Repo";
import { Vinyl } from "../domain/vinyl";

export interface IVinylRepo extends Repo<Vinyl> {
  getVinylCollection (traderId: string): Promise<Vinyl[]>;
}

export class VinylRepo implements IVinylRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
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