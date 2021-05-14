import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'ga_roles'}}})
export class GaRoles extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'roleName', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  roleName: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'createdAt', dataType: 'datetimeoffset', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'updatedAt', dataType: 'datetimeoffset', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  updatedAt: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GaRoles>) {
    super(data);
  }
}

export interface GaRolesRelations {
  // describe navigational properties here
}

export type GaRolesWithRelations = GaRoles & GaRolesRelations;
