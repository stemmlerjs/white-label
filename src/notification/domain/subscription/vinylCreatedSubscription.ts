
import { IHandle } from "../../../core/domain/events/IHandle";
import { VinylCreatedEvent } from "../../../catalog/domain/events/vinylCreatedEvent";
import { DomainEvents } from "../../../core/domain/events/DomainEvents";
import { IVinylRepo } from "../../../catalog/repos/vinylRepo";

export class VinylCreatedSubscription implements IHandle<VinylCreatedEvent> {
  private vinylRepo: IVinylRepo;

  constructor () {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onVinylCreatedEvent.bind(this), VinylCreatedEvent.name);
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