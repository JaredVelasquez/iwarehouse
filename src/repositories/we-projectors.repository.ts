import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {WeProjectors, WeProjectorsRelations} from '../models';

export class WeProjectorsRepository extends DefaultCrudRepository<
  WeProjectors,
  typeof WeProjectors.prototype.id,
  WeProjectorsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(WeProjectors, dataSource);
  }
}
