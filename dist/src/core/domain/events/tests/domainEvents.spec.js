"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = __importStar(require("sinon"));
const DomainEvents_1 = require("../DomainEvents");
const mockJobCreatedEvent_1 = require("./mocks/events/mockJobCreatedEvent");
const mockJobDeletedEvent_1 = require("./mocks/events/mockJobDeletedEvent");
const mockJobAggregateRoot_1 = require("./mocks/domain/mockJobAggregateRoot");
const mockPostToSocial_1 = require("./mocks/services/mockPostToSocial");
const mockJobAggregateRootId_1 = require("./mocks/domain/mockJobAggregateRootId");
const UniqueEntityID_1 = require("../../UniqueEntityID");
let social;
let job;
let spy;
describe('Domain Events', () => {
    beforeEach(() => {
        social = null;
        DomainEvents_1.DomainEvents.clearHandlers();
        DomainEvents_1.DomainEvents.clearMarkedAggregates();
        spy = null;
        job = null;
    });
    describe('Given a JobCreatedEvent, JobDeletedEvent and a PostToSocial handler class', () => {
        it('Should be able to setup event subscriptions', () => {
            social = new mockPostToSocial_1.MockPostToSocial();
            social.setupSubscriptions();
            expect(Object.keys(DomainEvents_1.DomainEvents['handlersMap']).length).toBe(2);
            expect(DomainEvents_1.DomainEvents['handlersMap'][mockJobCreatedEvent_1.MockJobCreatedEvent.name].length).toBe(1);
            expect(DomainEvents_1.DomainEvents['handlersMap'][mockJobDeletedEvent_1.MockJobDeletedEvent.name].length).toBe(1);
        });
        it('There should be exactly one handler subscribed to the JobCreatedEvent', () => {
            social = new mockPostToSocial_1.MockPostToSocial();
            social.setupSubscriptions();
            expect(DomainEvents_1.DomainEvents['handlersMap'][mockJobCreatedEvent_1.MockJobCreatedEvent.name].length).toBe(1);
        });
        it('There should be exactly one handler subscribed to the JobDeletedEvent', () => {
            social = new mockPostToSocial_1.MockPostToSocial();
            social.setupSubscriptions();
            expect(DomainEvents_1.DomainEvents['handlersMap'][mockJobCreatedEvent_1.MockJobCreatedEvent.name].length).toBe(1);
        });
        it('Should add the event to the DomainEvents list when the event is created', () => {
            job = mockJobAggregateRoot_1.MockJobAggregateRoot.createJob({}, mockJobAggregateRootId_1.MockJobAggregateRootId);
            social = new mockPostToSocial_1.MockPostToSocial();
            social.setupSubscriptions();
            var domainEventsAggregateSpy = sinon.spy(DomainEvents_1.DomainEvents, "markAggregateForDispatch");
            // setTimeout(() => {
            //   expect(domainEventsAggregateSpy.calledOnce).toBeTruthy();
            //   expect(domainEventsAggregateSpy.callCount).toBe(0)
            //   expect(DomainEvents['markedAggregates'][0]['length']).toBe(1);
            // }, 1000);
        });
        it('Should call the handlers when the event is dispatched after marking the aggregate root', () => {
            social = new mockPostToSocial_1.MockPostToSocial();
            social.setupSubscriptions();
            var jobCreatedEventSpy = sinon.spy(social, "handleJobCreatedEvent");
            var jobDeletedEventSpy = sinon.spy(social, "handleDeletedEvent");
            // Create the event, mark the aggregate
            job = mockJobAggregateRoot_1.MockJobAggregateRoot.createJob({}, mockJobAggregateRootId_1.MockJobAggregateRootId);
            // Dispatch the events now
            DomainEvents_1.DomainEvents.dispatchEventsForAggregate(mockJobAggregateRootId_1.MockJobAggregateRootId);
            // setTimeout(() => {
            //   expect(jobCreatedEventSpy.calledOnce).toBeFalsy();
            //   expect(jobDeletedEventSpy.calledOnce).toBeTruthy();
            // }, 1000);
        });
        it('Should remove the marked aggregate from the marked aggregates list after it gets dispatched', () => {
            social = new mockPostToSocial_1.MockPostToSocial();
            social.setupSubscriptions();
            // Create the event, mark the aggregate
            job = mockJobAggregateRoot_1.MockJobAggregateRoot.createJob({}, mockJobAggregateRootId_1.MockJobAggregateRootId);
            // Dispatch the events now
            DomainEvents_1.DomainEvents.dispatchEventsForAggregate(mockJobAggregateRootId_1.MockJobAggregateRootId);
            // setTimeout(() => {
            //   expect(DomainEvents['markedAggregates']['length']).toBe(0);
            // }, 1000);
        });
        it('Should only add the domain event to the ', () => {
            social = new mockPostToSocial_1.MockPostToSocial();
            social.setupSubscriptions();
            // Create the event, mark the aggregate
            mockJobAggregateRoot_1.MockJobAggregateRoot.createJob({}, new UniqueEntityID_1.UniqueEntityID('99'));
            expect(DomainEvents_1.DomainEvents['markedAggregates']['length']).toBe(1);
            // Create a new job, it should also get marked
            job = mockJobAggregateRoot_1.MockJobAggregateRoot.createJob({}, new UniqueEntityID_1.UniqueEntityID('12'));
            expect(DomainEvents_1.DomainEvents['markedAggregates']['length']).toBe(2);
            // Dispatch another action from the second job created
            job.deleteJob();
            // The number of aggregates should be the same
            expect(DomainEvents_1.DomainEvents['markedAggregates']['length']).toBe(2);
            // However, the second aggregate should have two events now
            expect(DomainEvents_1.DomainEvents['markedAggregates'][1].domainEvents.length).toBe(2);
            // And the first aggregate should have one event
            expect(DomainEvents_1.DomainEvents['markedAggregates'][0].domainEvents.length).toBe(1);
            // Dispatch the event for the first job
            DomainEvents_1.DomainEvents.dispatchEventsForAggregate(new UniqueEntityID_1.UniqueEntityID('99'));
            expect(DomainEvents_1.DomainEvents['markedAggregates']['length']).toBe(1);
            // The job with two events should still be there
            expect(DomainEvents_1.DomainEvents['markedAggregates'][0].domainEvents.length).toBe(2);
            // Dispatch the event for the second job
            DomainEvents_1.DomainEvents.dispatchEventsForAggregate(new UniqueEntityID_1.UniqueEntityID('12'));
            // There should be no more domain events in the list
            expect(DomainEvents_1.DomainEvents['markedAggregates']['length']).toBe(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluRXZlbnRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9kb21haW4vZXZlbnRzL3Rlc3RzL2RvbWFpbkV2ZW50cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDZDQUE4QjtBQUM5QixrREFBK0M7QUFDL0MsNEVBQXdFO0FBQ3hFLDRFQUF3RTtBQUN4RSw4RUFBMEU7QUFDMUUsd0VBQW9FO0FBQ3BFLGtGQUErRTtBQUMvRSx5REFBc0Q7QUFFdEQsSUFBSSxNQUF3QixDQUFDO0FBQzdCLElBQUksR0FBeUIsQ0FBQztBQUM5QixJQUFJLEdBQUcsQ0FBQztBQUVSLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO0lBRTdCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsMkJBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QiwyQkFBWSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDckMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNYLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQywyRUFBMkUsRUFBRSxHQUFHLEVBQUU7UUFDekYsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsRUFBRTtZQUNyRCxNQUFNLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRTVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEUsTUFBTSxDQUFDLDJCQUFZLENBQUMsYUFBYSxDQUFDLENBQUMseUNBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMs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