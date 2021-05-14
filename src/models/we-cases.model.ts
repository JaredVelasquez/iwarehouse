import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'we_cases'}}})
export class WeCases extends Entity {
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
    mssql: {columnName: 'serial', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  serial: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'brand', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'model', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  model: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'inventoryCode', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  inventoryCode: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'processorType', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  processorType?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'ramMemory', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  ramMemory?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'diskSpace', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  diskSpace?: string;

  @property({
    type: 'boolean',
    mssql: {columnName: 'guarantee', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  guarantee?: boolean;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'equipmentStatus', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  equipmentStatus?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'notes', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  notes?: string;

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

  constructor(data?: Partial<WeCases>) {
    super(data);
  }
}

export interface WeCasesRelations {

}

export type WeCasesWithRelations = WeCases & WeCasesRelations;
