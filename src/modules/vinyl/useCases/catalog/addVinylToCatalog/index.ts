
import { AddVinylToCatalogUseCase } from "./addVinylToCatalogUseCase";
import { vinylRepo, genresRepo, artistRepo, albumRepo } from "../../../repos";

const addVinylToCatalogUseCase = new AddVinylToCatalogUseCase(
  vinylRepo, artistRepo, genresRepo, albumRepo
);

export {
  addVinylToCatalogUseCase
}

