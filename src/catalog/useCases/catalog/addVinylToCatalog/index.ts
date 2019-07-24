
import { AddVinylToCatalogUseCase } from "./addVinylToCatalogUseCase";
import { vinylRepo, artistRepo } from "../../..";

const addVinylToCatalogUseCase = new AddVinylToCatalogUseCase(vinylRepo, artistRepo);

