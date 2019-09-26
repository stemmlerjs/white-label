import { IHandle } from "../../../core/domain/events/IHandle";
import { DomainEvents } from "../../../core/domain/events/DomainEvents";
import { VinylCreatedEvent } from "../domain/events/vinylCreatedEvent";

export class AfterVinylCreatedEvent implements IHandle<VinylCreatedEvent> {
  constructor () {
    this.setupSubscriptions();
  }

  setupSubscriptions () {
    DomainEvents.register(this.onVinylCreatedEvent.bind(this), VinylCreatedEvent.name);
  }

  private async onVinylCreatedEvent (event: VinylCreatedEvent): Promise<any> {
    
    // Get metadata about the vinyl from a metadata service and 
    // make ammendments to the vinyl.

  }
}