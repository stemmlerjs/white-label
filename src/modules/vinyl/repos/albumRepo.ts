

import { Repo } from "../../../core/infra/Repo";
import { Album } from "../domain/album";
import { AlbumId } from "../domain/albumId";
import { AlbumMap } from "../mappers/AlbumMap";
import { IGenresRepo } from "./genresRepo";
import { Genre } from "../domain/genre";

export interface IAlbumRepo extends Repo<Album> {
  findAlbumByAlbumId (albumId: AlbumId | string): Promise<Album>;
  removeAlbumById (albumId: AlbumId | string): Promise<Album>;
}

export class AlbumRepo implements IAlbumRepo {
  private models: any;
  private genresRepo: IGenresRepo

  constructor (models: any, genresRepo: IGenresRepo) {
    this.models = models;
    this.genresRepo = genresRepo;
  }

  private createBaseQuery (): any {
    const { models } = this;
    return {
      where: {},
      include: [
        { model: models.Genre, as: 'AlbumGenres', required: false }
      ]
    }
  }

  public async findAlbumByAlbumId (albumId: AlbumId | string): Promise<Album> {
    const AlbumModel = this.models.Album;
    const query = this.createBaseQuery();
    query['album_id'] = (
      albumId instanceof AlbumId ? (<AlbumId>albumId).id.toValue() : albumId
    );
    const album = await AlbumModel.findOne(query);
    if (!!album === false) {
      return null;
    }
    return AlbumMap.toDomain(album);
  }

  public async exists (albumId: AlbumId | string): Promise<boolean> {
    const AlbumModel = this.models.Album;
    const query = this.createBaseQuery();
    query['album_id'] = (
      albumId instanceof AlbumId ? (<AlbumId>albumId).id.toValue() : albumId
    );
    const album = await AlbumModel.findOne(query);
    return !!album === true;
  }

  public removeAlbumById (albumId: AlbumId | string): Promise<Album> {
    const AlbumModel = this.models.Artist;
    return AlbumModel.destroy({ 
      where: { 
        artist_id: albumId instanceof AlbumId 
          ? (<AlbumId>albumId).id.toValue() 
          : albumId
      }
    })
  }

  public async rollbackSave (album: Album): Promise<any> {
    const AlbumModel = this.models.Artist;
    await this.genresRepo.removeByGenreIds(album.genres.map((g) => g.genreId));
    await AlbumModel.destroy({
      where: {
        album_id: album.id.toString()
      }
    })
  }

  private async setAlbumGenres (sequelizeAlbumModel: any, genres: Genre[]): Promise<any[]> {
    if (!!sequelizeAlbumModel === false || genres.length === 0) return;
    return sequelizeAlbumModel.setGenres(genres.map((d) => d.genreId.id.toString()));
  }

  public async save (album: Album): Promise<Album> {
    const AlbumModel = this.models.Album;
    const exists: boolean = await this.exists(album.albumId);
    const rawAlbum: any = AlbumMap.toPersistence(album);

    let sequelizeAlbumModel;

    try {
      await this.genresRepo.saveCollection(album.genres);

      if (!exists) {
        sequelizeAlbumModel = await AlbumModel.create(rawAlbum);
      } else {
        sequelizeAlbumModel = await AlbumModel.update(rawAlbum);
      }

      await this.setAlbumGenres(sequelizeAlbumModel, album.genres);
    } catch (err) {
      this.rollbackSave(album);
    }

    return album;
  }
}