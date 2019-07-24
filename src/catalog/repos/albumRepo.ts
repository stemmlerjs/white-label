

import { Repo } from "../../core/infra/Repo";
import { Album } from "../domain/album";

export interface IAlbumRepo extends Repo<Album> {
  findAlbumByAlbumId (albumId: string): Promise<Album>;
}

export class AlbumRepo implements IAlbumRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  public findAlbumByAlbumId (albumId: string): Promise<Album> {
    return null;
  }

  public async exists (): Promise<boolean> {
    return false;
  }

  public async save (vinyl: Album): Promise<Album> {
    return null;
  }
}