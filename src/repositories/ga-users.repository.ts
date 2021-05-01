import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {GaUsers, GaUsersRelations} from '../models';

export class GaUsersRepository extends DefaultCrudRepository<
  GaUsers,
  typeof GaUsers.prototype.id,
  GaUsersRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(GaUsers, dataSource);
  }
}
