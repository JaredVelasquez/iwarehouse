import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'IwareHouseDBO',
  connector: 'mssql',
  url: 'mssql://jared:1234@DESKTOP-914IUVT/iwarehousedb',
  host: 'DESKTOP-914IUVT',
  port: 1433,
  user: 'jared',
  password: '1234',
  database: 'iwarehousedb'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class IwareHouseDboDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'IwareHouseDBO';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.IwareHouseDBO', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
