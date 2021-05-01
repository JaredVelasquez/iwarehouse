import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwareHouseDboDataSource} from '../datasources';
import {OeClassRooms, OeClassRoomsRelations} from '../models';

export class OeClassRoomsRepository extends DefaultCrudRepository<
  OeClassRooms,
  typeof OeClassRooms.prototype.id,
  OeClassRoomsRelations
> {
  constructor(
    @inject('datasources.IwareHouseDBO') dataSource: IwareHouseDboDataSource,
  ) {
    super(OeClassRooms, dataSource);
  }
}
