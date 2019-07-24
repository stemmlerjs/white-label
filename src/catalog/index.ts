
import { VinylRepo } from "./repos/vinylRepo";
import models from '../../sequelize/models';
import { ArtistRepo } from "./repos/artistRepo";
import { AlbumRepo } from "./repos/albumRepo";
import { GenresRepo } from "./repos/genresRepo";

const genresRepo = new GenresRepo(models);
const albumRepo = new AlbumRepo(models, genresRepo);
const artistRepo = new ArtistRepo(models, genresRepo);
const vinylRepo = new VinylRepo(models, artistRepo, albumRepo);

export {
  vinylRepo,
  artistRepo
}