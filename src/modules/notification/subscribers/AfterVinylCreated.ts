
import { IVinylRepo } from "../../vinyl/repos/vinylRepo";
import { IHandle } from "../../../core/domain/events/IHandle";
import { VinylCreatedEvent } from "../../vinyl/domain/events/vinylCreatedEvent";
import { DomainEvents } from "../../../core/domain/events/DomainEvents";

export class AfterVinylCreated implements IHandle<VinylCreatedEvent> {
  private vinylRepo: IVinylRepo;

  constructor () {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    const domainEventsPublisher = DomainEvents.create();
    domainEventsPublisher.register(this.onVinylCreatedEvent.bind(this), VinylCreatedEvent.name);
  }

  private async onVinylCreatedEvent (event: VinylCreatedEvent): Promise<void> {
    // Get vinyl from repo
    const vinyl = await this.vinylRepo.getVinylById(event.vinylId);

    if (vinyl) {
      // Get all traders interested in this vinyl
      
        // for trader in traders
          // Craft and send 'WishlistVinylPosted' email
      // Get all traders interested in this artist
        // for trader in traders
          // Craft and send 'WishlistArtistVinylPosted' email
    }
  }
}