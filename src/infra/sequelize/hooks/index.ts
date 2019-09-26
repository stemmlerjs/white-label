
import models from '../models';
import { DomainEvents } from '../../../core/domain/events/DomainEvents';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
}

(async function createHooksForAggregateRoots () {

  const { BaseUser } = models;

  BaseUser.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  BaseUser.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  BaseUser.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  BaseUser.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
  BaseUser.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'base_user_id'));

})();