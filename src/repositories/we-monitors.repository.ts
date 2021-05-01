import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {WeMonitors, WeMonitorsRelations} from '../models';

export class WeMonitorsRepository extends DefaultCrudRepository<
  WeMonitors,
  typeof WeMonitors.prototype.id,
  WeMonitorsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(WeMonitors, dataSource);
  }
}
