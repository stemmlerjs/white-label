
import { VinylRepo } from "./repos/vinylRepo";
import models from '../../sequelize/models';
import { ArtistRepo } from "./repos/artistRepo";

const vinylRepo = new VinylRepo(models);
const artistRepo = new ArtistRepo(models);

console.log('hi')

export {
  vinylRepo,
  artistRepo
}