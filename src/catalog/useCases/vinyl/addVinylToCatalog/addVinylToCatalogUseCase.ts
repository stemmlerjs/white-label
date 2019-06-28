
import { UseCase } from "../../../../core/domain/UseCase";
import { Vinyl } from "../../../domain/vinyl";
import { IVinylRepo } from "../../../repos/vinylRepo";
import { Result } from "../../../../core/Result";
import { TextUtil } from "../../../../utils/TextUtil";
import { IArtistRepo } from "../../../repos/artistRepo";
import { Artist } from "../../../domain/artist";
import { TraderId } from "../../../../trading/domain/traderId";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";

interface AddVinylToCatalogUseCaseRequestDTO {
  vinylName: string;
  artistNameOrId: string;
  traderId: string;
  genresArray?: string | string[];
}

export class AddVinylToCatalogUseCase implements UseCase<AddVinylToCatalogUseCaseRequestDTO, Result<Vinyl>> {
  private vinylRepo: IVinylRepo;
  private artistRepo: IArtistRepo;

  constructor (vinylRepo: IVinylRepo, artistRepo: IArtistRepo) {
    this.vinylRepo = vinylRepo;
    this.artistRepo = artistRepo;
  }

  public async execute (request: AddVinylToCatalogUseCaseRequestDTO): Promise<Result<Vinyl>> {
    const { vinylName, artistNameOrId, traderId, genresArray } = request;
    let artist: Artist;

    const isArtistId = TextUtil.isUUID(artistNameOrId);

    if (isArtistId) {
      artist = await this.artistRepo.findById(artistNameOrId);
    } else {
      artist = await this.artistRepo.findByArtistName(artistNameOrId);
    }

    const vinylOrError = Vinyl.create({
      title: vinylName,
      artist: artist,
      traderId: TraderId.create(new UniqueEntityID(traderId)),
      genres: []
    });

    if (vinylOrError.isFailure) {
      return Result.fail<Vinyl>(vinylOrError.error)
    } 

    const vinyl = vinylOrError.getValue()

    await this.vinylRepo.save(vinyl);
    return Result.ok<Vinyl>(vinyl)
  }
}