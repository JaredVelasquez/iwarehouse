import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Masterlists} from '../models';
import {GaUsersRepository, MasterlistsRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt_decrypt_service';

@authenticate('admin')
export class MasterlistController {
  constructor(
    @repository(MasterlistsRepository)
    public masterlistsRepository: MasterlistsRepository,
    @repository(GaUsersRepository)
    public gaUsersRepository: GaUsersRepository,
  ) { }


  @authenticate.skip()
  @post('/masterlists')
  @response(200, {
    description: 'Masterlists model instance',
    content: {'application/json': {schema: getModelSchemaRef(Masterlists)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Masterlists, {
            title: 'NewMasterlists',
            exclude: ['id'],
          }),
        },
      },
    })
    masterlists: Omit<Masterlists, 'id'>,
  ): Promise<Masterlists> {
    let auxdocpas = masterlists.pasdoc;
    masterlists.pasdoc = null;
    masterlists.status = 'Active';



    let m = await this.masterlistsRepository.create(masterlists);

    let passwordEncrypted = new EncryptDecrypt().Encrypt(auxdocpas);
    let newUser = {
      roleId: 2,
      masterlistCode: m.masterlistCode,
      username: m.email,
      password: passwordEncrypted,
      status: m.status,
      createdBy: m.createdBy,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt
    };

    let u = await this.gaUsersRepository.create(newUser);

    return m;
  }

  @get('/masterlists/count')
  @response(200, {
    description: 'Masterlists model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Masterlists) where?: Where<Masterlists>,
  ): Promise<Count> {
    return this.masterlistsRepository.count(where);
  }

  @get('/masterlists')
  @response(200, {
    description: 'Array of Masterlists model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Masterlists, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Masterlists) filter?: Filter<Masterlists>,
  ): Promise<Masterlists[]> {
    return this.masterlistsRepository.find(filter);
  }

  @patch('/masterlists')
  @response(200, {
    description: 'Masterlists PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Masterlists, {partial: true}),
        },
      },
    })
    masterlists: Masterlists,
    @param.where(Masterlists) where?: Where<Masterlists>,
  ): Promise<Count> {
    return this.masterlistsRepository.updateAll(masterlists, where);
  }

  @get('/masterlists/{id}')
  @response(200, {
    description: 'Masterlists model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Masterlists, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Masterlists, {exclude: 'where'}) filter?: FilterExcludingWhere<Masterlists>
  ): Promise<Masterlists> {
    return this.masterlistsRepository.findById(id, filter);
  }

  @patch('/masterlists/{id}')
  @response(204, {
    description: 'Masterlists PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Masterlists, {partial: true}),
        },
      },
    })
    masterlists: Masterlists,
  ): Promise<void> {
    await this.masterlistsRepository.updateById(id, masterlists);
  }

  @put('/masterlists/{id}')
  @response(204, {
    description: 'Masterlists PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() masterlists: Masterlists,
  ): Promise<void> {
    await this.masterlistsRepository.replaceById(id, masterlists);
  }

  @del('/masterlists/{id}')
  @response(204, {
    description: 'Masterlists DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.masterlistsRepository.deleteById(id);
  }
}
