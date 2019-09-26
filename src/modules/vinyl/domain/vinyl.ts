
import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { Artist } from "./artist";
import { TraderId } from "../../trading/domain/traderId";
import { VinylCreatedEvent } from "./events/vinylCreatedEvent";
import { VinylId } from "./vinylId";
import { VinylNotes } from "./vinylNotes";
import { Album } from "./album";

interface VinylProps {
  traderId: TraderId;
  artist: Artist;
  album: Album;
  vinylNotes?: VinylNotes;
  dateAdded?: Date;
}

export type VinylCollection = Vinyl[];

export class Vinyl extends AggregateRoot<VinylProps> {

  get vinylId(): VinylId {
    return VinylId.create(this.id)
  }

  get artist (): Artist {
    return this.props.artist;
  }

  get album (): Album {
    return this.props.album;
  }

  get dateAdded (): Date {
    return this.props.dateAdded;
  }

  get traderId (): TraderId {
    return this.props.traderId;
  }

  get vinylNotes (): VinylNotes {
    return this.props.vinylNotes;
  }

  private constructor (props: VinylProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: VinylProps, id?: UniqueEntityID): Result<Vinyl> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.album, argumentName: 'album' },
      { argument: props.artist, argumentName: 'artist' },
      { argument: props.traderId, argumentName: 'traderId' }
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Vinyl>(propsResult.message)
    } 

    const vinyl = new Vinyl({
      ...props,
      dateAdded: props.dateAdded ? props.dateAdded : new Date(),
    }, id);
    const isNewlyCreated = !!id === false;

    if (isNewlyCreated) {
      vinyl.addDomainEvent(new VinylCreatedEvent(vinyl.vinylId))
    }

    return Result.ok<Vinyl>(vinyl);
  }
}