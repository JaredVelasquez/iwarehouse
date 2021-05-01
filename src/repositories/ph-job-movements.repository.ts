import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {PhJobMovements, PhJobMovementsRelations} from '../models';

export class PhJobMovementsRepository extends DefaultCrudRepository<
  PhJobMovements,
  typeof PhJobMovements.prototype.id,
  PhJobMovementsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(PhJobMovements, dataSource);
  }
}
