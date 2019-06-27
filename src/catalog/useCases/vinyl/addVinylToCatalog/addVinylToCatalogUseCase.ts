
import { UseCase } from "../../../../core/domain/UseCase";
import { Vinyl } from "../../../domain/vinyl";
import { IVinylRepo } from "../../../repos/vinylRepo";

interface AddVinylToCatalogUseCaseRequestDTO {
  vinylName: string;
  artistNameOrId: string | number;
  traderId: string;
  genresArray: string | string[];
}

export class AddVinylToCatalogUseCase implements UseCase<AddVinylToCatalogUseCaseRequestDTO, any> {
  private vinylRepo: IVinylRepo;

  constructor (vinylRepo: IVinylRepo) {
    this.vinylRepo = vinylRepo;
  }

  public async execute (request: AddVinylToCatalogUseCaseRequestDTO): Promise<any> {
    const { vinylName, artistNameOrId, traderId, genresArray } = request;

  }
}