import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {OeOfficeUsers, OeOfficeUsersRelations} from '../models';

export class OeOfficeUsersRepository extends DefaultCrudRepository<
  OeOfficeUsers,
  typeof OeOfficeUsers.prototype.id,
  OeOfficeUsersRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(OeOfficeUsers, dataSource);
  }
}
