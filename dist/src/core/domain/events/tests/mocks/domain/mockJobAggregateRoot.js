"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aggregateRoot_1 = require("../../../../aggregateRoot");
const mockJobCreatedEvent_1 = require("../events/mockJobCreatedEvent");
const mockJobDeletedEvent_1 = require("../events/mockJobDeletedEvent");
class MockJobAggregateRoot extends aggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static createJob(props, id) {
        const job = new this(props, id);
        job.addDomainEvent(new mockJobCreatedEvent_1.MockJobCreatedEvent(job.id));
        return job;
    }
    deleteJob() {
        this.addDomainEvent(new mockJobDeletedEvent_1.MockJobDeletedEvent(this.id));
    }
}
exports.MockJobAggregateRoot = MockJobAggregateRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja0pvYkFnZ3JlZ2F0ZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9kb21haW4vZXZlbnRzL3Rlc3RzL21vY2tzL2RvbWFpbi9tb2NrSm9iQWdncmVnYXRlUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZEQUEwRDtBQUMxRCx1RUFBbUU7QUFFbkUsdUVBQW9FO0FBTXBFLE1BQWEsb0JBQXFCLFNBQVEsNkJBQTRCO0lBQ3BFLFlBQXFCLEtBQW9CLEVBQUUsRUFBbUI7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBRSxLQUFvQixFQUFFLEVBQW1CO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUkseUNBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU0sU0FBUztRQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSx5Q0FBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0NBRUY7QUFmRCxvREFlQyJ9