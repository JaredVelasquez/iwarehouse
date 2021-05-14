import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'oe_labs'}}})
export class OeLabs extends Entity {
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
    length: 255,
    mssql: {columnName: 'codeLab', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  codeLab?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'caseId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  caseId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'monitorId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  monitorId: number;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'computerName', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  computerName?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'macAddress', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  macAddress?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'ipAddress', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  ipAddress?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'tagNumber', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  tagNumber?: number;

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

  constructor(data?: Partial<OeLabs>) {
    super(data);
  }
}

export interface OeLabsRelations {

}

export type OeLabsWithRelations = OeLabs & OeLabsRelations;
