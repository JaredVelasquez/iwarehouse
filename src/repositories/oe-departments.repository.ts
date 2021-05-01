import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {OeDepartments, OeDepartmentsRelations} from '../models';

export class OeDepartmentsRepository extends DefaultCrudRepository<
  OeDepartments,
  typeof OeDepartments.prototype.id,
  OeDepartmentsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(OeDepartments, dataSource);
  }
}
