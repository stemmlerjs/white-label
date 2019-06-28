
import { Repo } from "../../core/infra/Repo";
import { Artist } from "../domain/artist";

export interface IArtistRepo extends Repo<Artist> {
  findByArtistName (name: string): Promise<Artist>;
  findById (artistId: string): Promise<Artist>;
}

export class ArtistRepo implements IArtistRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  public findById (artistId: string): Promise<Artist> {
    return null;
  }

  public findByArtistName (name: string): Promise<Artist> {
    return null;
  }

  public async exists (): Promise<boolean> {
    return false;
  }

  public async save (vinyl: Artist): Promise<Artist> {
    return null;
  }
}