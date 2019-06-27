
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/Result";
import { Artist } from "./artist";
import { Genre } from "./genre";
import { TraderId } from "../../trading/domain/traderId";
import { Guard } from "../../core/Guard";
import { VinylCreatedEvent } from "./events/vinylCreatedEvent";
import { VinylId } from "./vinylId";

interface VinylProps {
  traderId: TraderId;
  title: string;
  artist: Artist;
  genres: Genre[];
  dateAdded?: Date;
}

export class Vinyl extends AggregateRoot<VinylProps> {

  public static MAX_NUMBER_GENRES_PER_VINYL = 3;

  get vinylId(): VinylId {
    return VinylId.create(this.id)
  }

  get title (): string {
    return this.props.title;
  }

  get artist (): Artist {
    return this.props.artist
  }

  get genres (): Genre[] {
    return this.props.genres;
  }

  get dateAdded (): Date {
    return this.props.dateAdded;
  }

  public addGenre (genre: Genre): void {
    const maxLengthExceeded = this.props.genres
      .length >= Vinyl.MAX_NUMBER_GENRES_PER_VINYL;

    const alreadyAdded = this.props.genres
      .find((g) => g.id.equals(genre.id));

    if (!alreadyAdded && !maxLengthExceeded) {
      this.props.genres.push(genre);
    }
  }

  public removeGenre (genre: Genre): void {
    this.props.genres = this.props.genres
      .filter((g) => !g.id.equals(genre.id));
  }

  private constructor (props: VinylProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: VinylProps, id?: UniqueEntityID): Result<Vinyl> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.artist, argumentName: 'artist' },
      { argument: props.genres, argumentName: 'genres' },
      { argument: props.traderId, argumentName: 'traderId' }
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Vinyl>(propsResult.message)
    } 

    const vinyl = new Vinyl({
      ...props,
      dateAdded: props.dateAdded ? props.dateAdded : new Date(),
      genres: Array.isArray(props.genres) ? props.genres : [],
    }, id);
    const isNewlyCreated = !!id === false;

    if (isNewlyCreated) {
      vinyl.addDomainEvent(new VinylCreatedEvent(vinyl.vinylId))
    }

    return Result.ok<Vinyl>(vinyl);
  }
}