
import { UseCase } from "../../../../../core/domain/UseCase";
import { Vinyl } from "../../../domain/vinyl";
import { IVinylRepo } from "../../../repos/vinylRepo";
import { Result } from "../../../../../core/Result";
import { TextUtil } from "../../../../../utils/TextUtil";
import { IArtistRepo } from "../../../repos/artistRepo";
import { Artist } from "../../../domain/artist";
import { TraderId } from "../../../../trading/domain/traderId";
import { UniqueEntityID } from "../../../../../core/domain/UniqueEntityID";
import { ArtistName } from "../../../domain/artistName";
import { ParseUtils } from "../../../../../utils/ParseUtils";
import { GenresRepo, IGenresRepo } from "../../../repos/genresRepo";
import { Genre } from "../../../domain/genre";
import { Album } from "../../../domain/album";
import { IAlbumRepo } from "../../../repos/albumRepo";
import { GenreId } from "../../../domain/genreId";

interface GenresRequestDTO {
  new: string[];
  ids: string[];
}

interface AddVinylToCatalogUseCaseRequestDTO {
  artistNameOrId: string;
  artistGenres: string | GenresRequestDTO;
  albumNameOrId: string;
  albumGenres: string | GenresRequestDTO;
  albumYearReleased: number;
  traderId: string;
}

export class AddVinylToCatalogUseCase implements UseCase<AddVinylToCatalogUseCaseRequestDTO, Result<Vinyl>> {
  private vinylRepo: IVinylRepo;
  private artistRepo: IArtistRepo;
  private albumRepo: IAlbumRepo;
  private genresRepo: IGenresRepo;

  constructor (
    vinylRepo: IVinylRepo, 
    artistRepo: IArtistRepo, 
    genresRepo: GenresRepo, 
    albumRepo: IAlbumRepo
  ) {
    this.vinylRepo = vinylRepo;
    this.artistRepo = artistRepo;
    this.genresRepo = genresRepo;
    this.albumRepo = albumRepo;
  }

  private async getGenresFromDTO (artistGenres: string) {
    return (
      await this.genresRepo.findByIds(
        ((ParseUtils.parseObject(artistGenres) as Result<GenresRequestDTO>)
          .getValue().ids.map(
            (genreId) => GenreId.create(new UniqueEntityID(genreId)
          )
        ))
      ))
      .concat(
        ((ParseUtils.parseObject(artistGenres) as Result<GenresRequestDTO>)
            .getValue().new)
            .map((name) => Genre.create(name).getValue())
    )
  }

  private async getArtist (request: AddVinylToCatalogUseCaseRequestDTO): Promise<Result<Artist>> {
    const { artistNameOrId, artistGenres } = request;
    const isArtistIdProvided = TextUtil.isUUID(artistNameOrId);

    if (isArtistIdProvided) {
      const artist = await this.artistRepo.findByArtistId(artistNameOrId);
      const found = !!artist;

      if (found) {
        return Result.ok<Artist>(artist);
      } else {
        return Result.fail<Artist>(`Couldn't find artist by id=${artistNameOrId}`);
      }
    } 
    else {
      return Artist.create({ 
        name: ArtistName.create(artistNameOrId).getValue(), 
        genres: await this.getGenresFromDTO(artistGenres as string)
      })
    }
  }

  private async getAlbum (request: AddVinylToCatalogUseCaseRequestDTO, artist: Artist): Promise<Result<Album>> {
    const { albumNameOrId, albumGenres, albumYearReleased } = request;
    const isAlbumIdProvided = TextUtil.isUUID(albumNameOrId);

    if (isAlbumIdProvided) {
      const album = await this.albumRepo.findAlbumByAlbumId(albumNameOrId);
      const found = !!album;

      if (found) {
        return Result.ok<Album>(album)
      } else {
        return Result.fail<Album>(`Couldn't find album by id=${album}`)
      }
    } else {
      return Album.create({
        name: albumNameOrId,
        artistId: artist.artistId,
        genres: await this.getGenresFromDTO(albumGenres as string),
        yearReleased: albumYearReleased
      })
    }
  }

  public async execute (request: AddVinylToCatalogUseCaseRequestDTO): Promise<Result<Vinyl>> {
    const { traderId } = request;

    let artist: Artist;
    let album: Album;
  
    try {

      const artistOrError = await this.getArtist(request);
      if (artistOrError.isFailure) {
        return Result.fail<Vinyl>(artistOrError.error);
      } else {
        artist = artistOrError.getValue();
      }

      const albumOrError = await this.getAlbum(request, artist);
      if (albumOrError.isFailure) {
        return Result.fail<Vinyl>(albumOrError.error);
      } else {
        album = albumOrError.getValue();
      }

      const vinylOrError = Vinyl.create({
        album: album,
        artist: artist,
        traderId: TraderId.create(new UniqueEntityID(traderId)),
      });
  
      if (vinylOrError.isFailure) {
        return Result.fail<Vinyl>(vinylOrError.error)
      } 
  
      const vinyl = vinylOrError.getValue();

      // This is where all the magic happens
      await this.vinylRepo.save(vinyl);

      return Result.ok<Vinyl>(vinyl)

    } catch (err) {
      console.log(err);
      return Result.fail<Vinyl>(err);
    }
  }
}