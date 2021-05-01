import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {PhJobs, PhJobsRelations} from '../models';

export class PhJobsRepository extends DefaultCrudRepository<
  PhJobs,
  typeof PhJobs.prototype.id,
  PhJobsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(PhJobs, dataSource);
  }
}
