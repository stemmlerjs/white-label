
import { MockJobCreatedEvent } from "../events/mockJobCreatedEvent";
import { MockJobDeletedEvent } from "../events/mockJobDeletedEvent";
import { IHandle } from "../../../IHandle";
import { DomainEvents } from "../../../DomainEvents";
import { getNamespace } from "cls-hooked";
import { clsName } from "../../../../../../config";

export class MockPostToSocial implements IHandle<MockJobCreatedEvent>, IHandle<MockJobDeletedEvent> {
  constructor () {

  }

  /**
   * This is how we may setup subscriptions to domain events.
   */

  setupSubscriptions (): void {
    const domainEventsPublisher = DomainEvents.create();
    domainEventsPublisher.register(this.handleJobCreatedEvent, MockJobCreatedEvent.name);
    domainEventsPublisher.register(this.handleDeletedEvent, MockJobDeletedEvent.name);
  }

  /**
   * These are examples of how we define the handlers for domain events.
   */

  handleJobCreatedEvent (event: MockJobCreatedEvent): void {
    console.log('A job was created!!!')
  }

  handleDeletedEvent (event: MockJobDeletedEvent): void {
    console.log('A job was deleted!!!')
  }
}