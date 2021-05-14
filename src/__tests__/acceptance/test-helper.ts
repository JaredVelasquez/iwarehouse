import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {IwarehouseappApplication} from '../..';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
  });

  const app = new IwarehouseappApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: IwarehouseappApplication;
  client: Client;
}
