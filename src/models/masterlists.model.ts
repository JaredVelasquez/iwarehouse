import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'masterlists'}}})
export class Masterlists extends Entity {
  @property({
    type: 'string',
    required: false,
    length: 50,
    id: 1,
    mssql: {columnName: 'masterlistCode', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  masterlistCode?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'humanCode', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  humanCode: string;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'role_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  roleId?: number;

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
    type: 'date',
    required: true,
    mssql: {columnName: 'birthdate', dataType: 'datetimeoffset', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  birthdate: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'gender', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'place', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  place: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'addressLine1', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  addressLine1?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'phone1', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  phone1?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'phone2', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  phone2?: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'email', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'passwordHash', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  passwordHash: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'username', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  username: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'profileImgUrl', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  profileImgUrl?: string;

  @property({
    type: 'string',
    required: false,
    length: 255,
    mssql: {columnName: 'status', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  status?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'createdBy', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  createdBy?: string;

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

  constructor(data?: Partial<Masterlists>) {
    super(data);
  }
}

export interface MasterlistsRelations {
  // describe navigational properties here
}

export type MasterlistsWithRelations = Masterlists & MasterlistsRelations;
