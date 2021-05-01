import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {WeCases, WeCasesRelations} from '../models';

export class WeCasesRepository extends DefaultCrudRepository<
  WeCases,
  typeof WeCases.prototype.id,
  WeCasesRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(WeCases, dataSource);
  }
}
