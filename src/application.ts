import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {AdministradorStrategy} from './estrategies/administrator_strategy';
import {EditorStrategy} from './estrategies/editor_strategy';
import {ReaderStrategy} from './estrategies/reader_strategy';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class IwarehouseappApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    registerAuthenticationStrategy(this, AdministradorStrategy);
    registerAuthenticationStrategy(this, EditorStrategy);
    registerAuthenticationStrategy(this, ReaderStrategy);
    this.component(AuthenticationComponent);

  }
}
