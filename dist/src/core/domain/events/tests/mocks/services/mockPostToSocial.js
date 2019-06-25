"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockJobCreatedEvent_1 = require("../events/mockJobCreatedEvent");
const mockJobDeletedEvent_1 = require("../events/mockJobDeletedEvent");
const DomainEvents_1 = require("../../../DomainEvents");
class MockPostToSocial {
    constructor() {
    }
    /**
     * This is how we may setup subscriptions to domain events.
     */
    setupSubscriptions() {
        DomainEvents_1.DomainEvents.register(this.handleJobCreatedEvent, mockJobCreatedEvent_1.MockJobCreatedEvent.name);
        DomainEvents_1.DomainEvents.register(this.handleDeletedEvent, mockJobDeletedEvent_1.MockJobDeletedEvent.name);
    }
    /**
     * These are examples of how we define the handlers for domain events.
     */
    handleJobCreatedEvent(event) {
        console.log('A job was created!!!');
    }
    handleDeletedEvent(event) {
        console.log('A job was deleted!!!');
    }
}
exports.MockPostToSocial = MockPostToSocial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja1Bvc3RUb1NvY2lhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2RvbWFpbi9ldmVudHMvdGVzdHMvbW9ja3Mvc2VydmljZXMvbW9ja1Bvc3RUb1NvY2lhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVFQUFvRTtBQUNwRSx1RUFBb0U7QUFFcEUsd0RBQXFEO0FBRXJELE1BQWEsZ0JBQWdCO0lBQzNCO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBRUgsa0JBQWtCO1FBQ2hCLDJCQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSx5Q0FBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RSwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUseUNBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOztPQUVHO0lBRUgscUJBQXFCLENBQUUsS0FBMEI7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFFRCxrQkFBa0IsQ0FBRSxLQUEwQjtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDckMsQ0FBQztDQUNGO0FBekJELDRDQXlCQyJ9