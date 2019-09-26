
import { Repo } from "../../../core/infra/Repo";
import { Genre } from "../domain/genre";
import { GenreId } from "../domain/genreId";
import { GenreMap } from "../mappers/GenreMap";

export interface IGenresRepo extends Repo<Genre> {
  findById (genreId: GenreId | string): Promise<Genre>;
  findByIds (genreIds: GenreId[]): Promise<Genre[]>;
  saveCollection (genres: Genre[]): Promise<Genre>;
  removeByGenreIds (genres: GenreId[]): Promise<any>
}

export class GenresRepo implements IGenresRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async findById (genreId: GenreId | string): Promise<Genre> {
    const GenreModel = this.models.Genre;
    const query = this.createBaseQuery();
    query.where['genre_id'] = (
      genreId instanceof GenreId ? (<GenreId>genreId).id.toValue() : genreId
    );
    const sequelizeGenreInstance = await GenreModel.findOne(query);
    if (!!sequelizeGenreInstance === false) {
      return null;
    }
    return GenreMap.toDomain(sequelizeGenreInstance);
  }

  public async findByIds (genreIds: GenreId[]): Promise<Genre[]> {
    const GenreModel = this.models.Genre;
    const query = this.createBaseQuery();
    query.where['genre_id'] = genreIds.map((g) => (
      g instanceof GenreId ? (<GenreId>g).id.toValue() : g
    ))
    const sequelizeGenreInstances = await GenreModel.findOne(query);
    if (!!sequelizeGenreInstances === false) {
      return null;
    }
    return sequelizeGenreInstances.map((g) => GenreMap.toDomain(g))
  }

  public async exists (genreId: GenreId | string): Promise<boolean> {
    const GenreModel = this.models.Genre;
    const query = this.createBaseQuery();
    query.where['genre_id'] = (
      genreId instanceof GenreId ? (<GenreId>genreId).id.toValue() : genreId
    );
    const sequelizeGenreInstance = await GenreModel.findOne(query);
    return !!sequelizeGenreInstance === true;
  }

  public async save (genre: Genre): Promise<Genre> {
    throw new Error('Not implemented');
  }

  public async saveCollection (genres: Genre[]): Promise<Genre> {
    const GenreModel = this.models.Genre;
    return GenreModel.bulkCreate(
      genres.map((g) => GenreMap.toPersistence(g)
    ), { ignoreDuplicates: true })
  }

  public async removeByGenreIds (genreIds: GenreId[]): Promise<any> {
    const GenreModel = this.models.Genre;
    return GenreModel.destroy({
      where: {
        genre_id: genreIds.map((g) => (
          g instanceof GenreId ? (<GenreId>g).id.toValue() : g
        ))
      }
    })
  }
}