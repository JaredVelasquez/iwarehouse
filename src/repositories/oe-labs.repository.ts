import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {OeLabs, OeLabsRelations} from '../models';

export class OeLabsRepository extends DefaultCrudRepository<
  OeLabs,
  typeof OeLabs.prototype.id,
  OeLabsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(OeLabs, dataSource);
  }
}
