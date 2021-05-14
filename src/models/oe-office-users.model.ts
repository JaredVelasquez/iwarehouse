import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'oe_officeUsers'}}
})
export class OeOfficeUsers extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'firstName', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'lastName', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  lastName: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'departmentId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  departmentId: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'emailAddress', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  emailAddress: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'phoneNumber', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  phoneNumber?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'activeDirectoryUser', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  activeDirectoryUser?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'extNumber', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  extNumber?: string;

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


  [prop: string]: any;

  constructor(data?: Partial<OeOfficeUsers>) {
    super(data);
  }
}

export interface OeOfficeUsersRelations {

}

export type OeOfficeUsersWithRelations = OeOfficeUsers & OeOfficeUsersRelations;
