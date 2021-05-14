import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'ph_jobs'}}})
export class PhJobs extends Entity {
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
    mssql: {columnName: 'jobTitle', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  jobTitle: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'role', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  role: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'description', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'level', dataType: 'nvarchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  level: string;

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

  constructor(data?: Partial<PhJobs>) {
    super(data);
  }
}

export interface PhJobsRelations {
  // describe navigational properties here
}

export type PhJobsWithRelations = PhJobs & PhJobsRelations;
