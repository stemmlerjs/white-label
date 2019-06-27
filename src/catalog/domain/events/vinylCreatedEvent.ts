
import { IDomainEvent } from "../../../core/domain/events/IDomainEvent";
import { VinylId } from "../vinylId";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";

export class VinylCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public vinylId: VinylId;

  constructor (vinylId: VinylId) {
    this.vinylId = vinylId;
  }

  public getAggregateId (): UniqueEntityID {
    return this.vinylId.id;
  }
}