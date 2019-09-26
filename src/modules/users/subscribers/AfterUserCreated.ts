
import { IHandle } from "../../../core/domain/events/IHandle";
import { UserCreatedEvent } from "../domain/events/userCreatedEvent";
import { DomainEvents } from "../../../core/domain/events/DomainEvents";
import { AssignInitialUsername } from "../useCases/assignInitialUsername/AssignInitialUsername";

export class AfterUserCreated implements IHandle<UserCreatedEvent> {
  private assignInitialUsername: AssignInitialUsername;

  constructor (assignInitialUsername: AssignInitialUsername) {
    this.setupSubscriptions();
    this.assignInitialUsername = assignInitialUsername;
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreatedEvent.name);
  }

  private async onUserCreatedEvent (event: UserCreatedEvent): Promise<void> {
    const { user } = event;

    this.assignInitialUsername.execute({ user })
      .then((r) => { console.log(r) })
      .catch((err) => { console.log(err) })
    
  }
}