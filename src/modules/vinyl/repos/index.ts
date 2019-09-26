
import { GenresRepo } from "./genresRepo";
import models from "../../../infra/sequelize/models";
import { VinylRepo } from "./vinylRepo";
import { AlbumRepo } from "./albumRepo";
import { ArtistRepo } from "./artistRepo";

const genresRepo = new GenresRepo(models);
const artistRepo = new ArtistRepo(models, genresRepo);
const albumRepo = new AlbumRepo(models, genresRepo);
const vinylRepo = new VinylRepo(models, artistRepo, albumRepo);

export {
  genresRepo,
  artistRepo,
  albumRepo,
  vinylRepo,
}
