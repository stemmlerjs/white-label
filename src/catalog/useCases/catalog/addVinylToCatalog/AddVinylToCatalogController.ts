import { BaseController } from "../../../../core/infra/BaseController";
import { AddVinylToCatalogUseCase } from "./addVinylToCatalogUseCase";

export class AddVinylToCatalogController extends BaseController {
  private useCase: AddVinylToCatalogUseCase;

  public constructor (useCase: AddVinylToCatalogUseCase) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl (): Promise<any> {
    
  }
}
