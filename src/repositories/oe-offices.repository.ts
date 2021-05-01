import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {OeOffices, OeOfficesRelations} from '../models';

export class OeOfficesRepository extends DefaultCrudRepository<
  OeOffices,
  typeof OeOffices.prototype.id,
  OeOfficesRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(OeOffices, dataSource);
  }
}
