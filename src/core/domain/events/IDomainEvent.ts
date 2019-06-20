
import { UniqueEntityID } from "../../core/types";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): UniqueEntityID;
}

