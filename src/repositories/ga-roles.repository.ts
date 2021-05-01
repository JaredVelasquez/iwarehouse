import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {GaRoles, GaRolesRelations} from '../models';

export class GaRolesRepository extends DefaultCrudRepository<
  GaRoles,
  typeof GaRoles.prototype.id,
  GaRolesRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(GaRoles, dataSource);
  }
}
