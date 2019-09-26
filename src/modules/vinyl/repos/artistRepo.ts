
import { Repo } from "../../../core/infra/Repo";
import { Artist } from "../domain/artist";
import { ArtistId } from "../domain/artistId";
import { ArtistMap } from "../mappers/ArtistMap";
import { IGenresRepo } from "./genresRepo";
import { Genre } from "../domain/genre";

export interface IArtistRepo extends Repo<Artist> {
  findByArtistId (artistId: string): Promise<Artist>;
  removeArtistById (artistId: ArtistId | string): Promise<any>;
}

export class ArtistRepo implements IArtistRepo {
  private models: any;
  private genresRepo: IGenresRepo;

  constructor (models: any, genresRepo: IGenresRepo) {
    this.models = models;
    this.genresRepo = genresRepo;
  }

  private createBaseQuery (): any {
    const { models } = this;
    return {
      where: {},
      include: [
        { model: models.Genre, as: 'ArtistGenres', required: false }
      ]
    }
  }

  public async findByArtistId (artistId: ArtistId | string): Promise<Artist> {
    const ArtistModel = this.models.Artist;
    const query = this.createBaseQuery();
    query['artist_id'] = (
      artistId instanceof ArtistId ? (<ArtistId>artistId).id.toValue() : artistId
    );
    const artistSequelizeInstance = await ArtistModel.findOne(query);
    return ArtistMap.toDomain(artistSequelizeInstance);
  }

  public async exists (artistId: ArtistId | string): Promise<boolean> {
    const ArtistModel = this.models.Artist;
    const query = this.createBaseQuery();
    query['artist_id'] = (
      artistId instanceof ArtistId ? (<ArtistId>artistId).id.toValue() : artistId
    );
    const artistSequelizeInstance = await ArtistModel.findOne(query);
    return !!artistSequelizeInstance === true;
  }

  public async removeArtistById (artistId: ArtistId | string): Promise<any> {
    const ArtistModel = this.models.Artist;
    return ArtistModel.destroy({ 
      where: { 
        artist_id: artistId instanceof ArtistId 
          ? (<ArtistId>artistId).id.toValue() 
          : artistId
      }
    })
  }

  public async rollbackSave (artist: Artist): Promise<any> {
    const ArtistModel = this.models.Artist;
    await this.genresRepo.removeByGenreIds(artist.genres.map((g) => g.genreId));
    await ArtistModel.destroy({
      where: {
        artist_id: artist.id.toString()
      }
    })
  }

  private async setArtistGenres (sequelizeArtistModel: any, genres: Genre[]): Promise<any[]> {
    if (!!sequelizeArtistModel === false || genres.length === 0) return;
    return sequelizeArtistModel.setGenres(genres.map((d) => d.genreId.id.toString()));
  }

  public async save (artist: Artist): Promise<Artist> {
    const ArtistModel = this.models.Artist;
    const exists: boolean = await this.exists(artist.artistId);
    const rawArtist: any = ArtistMap.toPersistence(artist);

    let sequelizeArtistModel;

    try {
      await this.genresRepo.saveCollection(artist.genres);

      if (!exists) {
        sequelizeArtistModel = await ArtistModel.create(rawArtist);
      } else {
        sequelizeArtistModel = await ArtistModel.update(rawArtist);
      }

      await this.setArtistGenres(sequelizeArtistModel, artist.genres);
    } catch (err) {
      this.rollbackSave(artist);
    }

    return artist;
  }
}