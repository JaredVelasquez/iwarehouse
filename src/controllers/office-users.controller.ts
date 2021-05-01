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
import {OeOfficeUsers} from '../models';
import {OeOfficeUsersRepository} from '../repositories';


@authenticate('admin', 'editor', 'reader')
export class OfficeUsersController {
  constructor(
    @repository(OeOfficeUsersRepository)
    public oeOfficeUsersRepository: OeOfficeUsersRepository,
  ) { }

  @post('/oe-office-users')
  @response(200, {
    description: 'OeOfficeUsers model instance',
    content: {'application/json': {schema: getModelSchemaRef(OeOfficeUsers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeOfficeUsers, {
            title: 'NewOeOfficeUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    oeOfficeUsers: Omit<OeOfficeUsers, 'id'>,
  ): Promise<OeOfficeUsers> {
    return this.oeOfficeUsersRepository.create(oeOfficeUsers);
  }

  @authenticate.skip()
  @get('/oe-office-users/count')
  @response(200, {
    description: 'OeOfficeUsers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OeOfficeUsers) where?: Where<OeOfficeUsers>,
  ): Promise<Count> {
    return this.oeOfficeUsersRepository.count(where);
  }

  @authenticate.skip()
  @get('/oe-office-users')
  @response(200, {
    description: 'Array of OeOfficeUsers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OeOfficeUsers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OeOfficeUsers) filter?: Filter<OeOfficeUsers>,
  ): Promise<OeOfficeUsers[]> {
    return this.oeOfficeUsersRepository.find(filter);
  }

  @patch('/oe-office-users')
  @response(200, {
    description: 'OeOfficeUsers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeOfficeUsers, {partial: true}),
        },
      },
    })
    oeOfficeUsers: OeOfficeUsers,
    @param.where(OeOfficeUsers) where?: Where<OeOfficeUsers>,
  ): Promise<Count> {
    return this.oeOfficeUsersRepository.updateAll(oeOfficeUsers, where);
  }

  @authenticate.skip()
  @get('/oe-office-users/{id}')
  @response(200, {
    description: 'OeOfficeUsers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OeOfficeUsers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OeOfficeUsers, {exclude: 'where'}) filter?: FilterExcludingWhere<OeOfficeUsers>
  ): Promise<OeOfficeUsers> {
    return this.oeOfficeUsersRepository.findById(id, filter);
  }

  @patch('/oe-office-users/{id}')
  @response(204, {
    description: 'OeOfficeUsers PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeOfficeUsers, {partial: true}),
        },
      },
    })
    oeOfficeUsers: OeOfficeUsers,
  ): Promise<void> {
    await this.oeOfficeUsersRepository.updateById(id, oeOfficeUsers);
  }

  @put('/oe-office-users/{id}')
  @response(204, {
    description: 'OeOfficeUsers PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oeOfficeUsers: OeOfficeUsers,
  ): Promise<void> {
    await this.oeOfficeUsersRepository.replaceById(id, oeOfficeUsers);
  }

  @del('/oe-office-users/{id}')
  @response(204, {
    description: 'OeOfficeUsers DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oeOfficeUsersRepository.deleteById(id);
  }
}
