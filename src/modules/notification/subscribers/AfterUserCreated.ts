
import { IHandle } from "../../../core/domain/events/IHandle";
import { DomainEvents } from "../../../core/domain/events/DomainEvents";
import { UserCreatedEvent } from "../../users/domain/events/userCreatedEvent";
import { NotifySlackChannel } from "../useCases/notifySlackChannel/NotifySlackChannel";
import { User } from "../../users/domain/user";

export class AfterUserCreated implements IHandle<UserCreatedEvent> {
  private notifySlackChannel: NotifySlackChannel;

  constructor (notifySlackChannel: NotifySlackChannel) {
    this.setupSubscriptions();
    this.notifySlackChannel = notifySlackChannel;
  }

  setupSubscriptions(): void {
    const domainEventsPublisher = DomainEvents.create();
    domainEventsPublisher.register(this.onUserCreatedEvent.bind(this), UserCreatedEvent.name);
  }

  private craftSlackMessage (user: User): string {
    return `Hey! Guess who just joined us? => ${user.firstName} ${user.lastName}\n
      Need to reach 'em? Their email is ${user.email}.`
  }

  private async onUserCreatedEvent (event: UserCreatedEvent): Promise<void> {
    const { user } = event;

    try {
      await this.notifySlackChannel.execute({ 
        channel: 'growth', 
        message: this.craftSlackMessage(user)
      })
    } catch (err) {

    }
  }
}