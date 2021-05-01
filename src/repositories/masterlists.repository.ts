import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {Masterlists, MasterlistsRelations} from '../models';

export class MasterlistsRepository extends DefaultCrudRepository<
  Masterlists,
  typeof Masterlists.prototype.masterlistCode,
  MasterlistsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(Masterlists, dataSource);
  }
}
