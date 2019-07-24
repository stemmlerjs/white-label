
import { Repo } from "../../core/infra/Repo";
import { Genre } from "../domain/genre";

export interface IGenresRepo extends Repo<Genre> {
  findById (genreId: string): Promise<Genre>;
  findByIds (genreIds: string[]): Promise<Genre[]>;
}

export class GenresRepo implements IGenresRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  public findById (genreId: string): Promise<Genre> {
    return null;
  }

  public findByIds (genreIds: string[]): Promise<Genre[]> {
    return null;
  }

  public async exists (): Promise<boolean> {
    return false;
  }

  public async save (vinyl: Genre): Promise<Genre> {
    return null;
  }
}