import { IDomainEvent } from "../../../../core/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { User } from "../user";

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor (user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.user.id;
  }
}