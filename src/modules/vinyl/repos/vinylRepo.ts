import { Repo } from "../../../core/infra/Repo";
import { Vinyl } from "../domain/vinyl";
import { VinylId } from "../domain/vinylId";
import { VinylMap } from "../mappers/VinylMap";
import { TraderId } from "../../trading/domain/traderId";
import { IArtistRepo } from "./artistRepo";
import { IAlbumRepo } from "./albumRepo";

export interface IVinylRepo extends Repo<Vinyl> {
  getVinylById (vinylId: VinylId): Promise<Vinyl>;
  getVinylCollection (traderId: string): Promise<Vinyl[]>;
}

export class VinylRepo implements IVinylRepo {
  private models: any;
  private albumRepo: IAlbumRepo;
  private artistRepo: IArtistRepo;

  constructor (models: any, artistRepo: IArtistRepo, albumRepo: IAlbumRepo) {
    this.models = models;
    this.artistRepo = artistRepo;
    this.albumRepo = albumRepo;
  }

  private createBaseQuery (): any {
    const { models } = this;
    return {
      where: {},
      include: [
        { 
          model: models.Artist, as: 'Artist',
          include: [
            { model: models.Genre, as: 'ArtistGenres', required: false }
          ]
        },
        { 
          model: models.Album, as: 'Album', 
          include: [
            { model: models.Genre, as: 'AlbumGenres', required: false }
          ] 
        }
      ]
    }
  }

  public async getVinylById (vinylId: VinylId | string): Promise<Vinyl> {
    const VinylModel = this.models.Vinyl;
    const query = this.createBaseQuery();
    query.where['vinyl_id'] = (
      vinylId instanceof VinylId ? (<VinylId>vinylId).id.toValue() : vinylId
    );
    const sequelizeVinylInstance = await VinylModel.findOne(query);
    if (!!sequelizeVinylInstance === false) {
      return null;
    }
    return VinylMap.toDomain(sequelizeVinylInstance);
  }

  public async exists (vinylId: VinylId | string): Promise<boolean> {
    const VinylModel = this.models.Vinyl;
    const query = this.createBaseQuery();
    query.where['vinyl_id'] = (
      vinylId instanceof VinylId ? (<VinylId>vinylId).id.toValue() : vinylId
    );
    const sequelizeVinylInstance = await VinylModel.findOne(query);
    return !!sequelizeVinylInstance === true;
  }

  public async getVinylCollection (traderId: TraderId | string): Promise<Vinyl[]> {
    const VinylModel = this.models.Vinyl;
    const query = this.createBaseQuery();
    query.where['trader_id'] = (
      traderId instanceof TraderId ? (<TraderId>traderId).id.toValue() : traderId
    );
    const sequelizeVinylCollection = await VinylModel.findAll(query);
    return sequelizeVinylCollection.map((v) => VinylMap.toDomain(v));
  }

  private async rollbackSave (vinyl: Vinyl) {
    const VinylModel = this.models.Vinyl;
    await this.artistRepo.removeArtistById(vinyl.artist.artistId);
    await this.albumRepo.removeAlbumById(vinyl.artist.artistId);
    await VinylModel.destroy({
      where: {
        vinyl_id: vinyl.vinylId.id.toString()
      }
    })
  }

  public async save (vinyl: Vinyl): Promise<Vinyl> {
    const VinylModel = this.models.Vinyl;
    const exists: boolean = await this.exists(vinyl.vinylId);
    const rawVinyl: any = VinylMap.toPersistence(vinyl);

    try {
      await this.artistRepo.save(vinyl.artist);
      await this.albumRepo.save(vinyl.album);

      if (!exists) {
        await VinylModel.create(rawVinyl);
      } else {
        await VinylModel.update(rawVinyl);
      }
    } catch (err) {
      this.rollbackSave(vinyl);
    }

    return vinyl;
  }
}