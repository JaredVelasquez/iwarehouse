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
import {GaRoles} from '../models';
import {GaRolesRepository} from '../repositories';


@authenticate('admin')
export class RolesController {
  constructor(
    @repository(GaRolesRepository)
    public gaRolesRepository: GaRolesRepository,
  ) { }

  @authenticate('admin')
  @post('/ga-roles')
  @response(200, {
    description: 'GaRoles model instance',
    content: {'application/json': {schema: getModelSchemaRef(GaRoles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GaRoles, {
            title: 'NewGaRoles',
            exclude: ['id'],
          }),
        },
      },
    })
    gaRoles: Omit<GaRoles, 'id'>,
  ): Promise<GaRoles> {
    return this.gaRolesRepository.create(gaRoles);
  }

  @authenticate.skip()
  @get('/ga-roles/count')
  @response(200, {
    description: 'GaRoles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GaRoles) where?: Where<GaRoles>,
  ): Promise<Count> {
    return this.gaRolesRepository.count(where);
  }

  @get('/ga-roles')
  @response(200, {
    description: 'Array of GaRoles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GaRoles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GaRoles) filter?: Filter<GaRoles>,
  ): Promise<GaRoles[]> {
    return this.gaRolesRepository.find(filter);
  }

  @patch('/ga-roles')
  @response(200, {
    description: 'GaRoles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GaRoles, {partial: true}),
        },
      },
    })
    gaRoles: GaRoles,
    @param.where(GaRoles) where?: Where<GaRoles>,
  ): Promise<Count> {
    return this.gaRolesRepository.updateAll(gaRoles, where);
  }

  @get('/ga-roles/{id}')
  @response(200, {
    description: 'GaRoles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GaRoles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GaRoles, {exclude: 'where'}) filter?: FilterExcludingWhere<GaRoles>
  ): Promise<GaRoles> {
    return this.gaRolesRepository.findById(id, filter);
  }

  @patch('/ga-roles/{id}')
  @response(204, {
    description: 'GaRoles PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GaRoles, {partial: true}),
        },
      },
    })
    gaRoles: GaRoles,
  ): Promise<void> {
    await this.gaRolesRepository.updateById(id, gaRoles);
  }

  @put('/ga-roles/{id}')
  @response(204, {
    description: 'GaRoles PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gaRoles: GaRoles,
  ): Promise<void> {
    await this.gaRolesRepository.replaceById(id, gaRoles);
  }

  @del('/ga-roles/{id}')
  @response(204, {
    description: 'GaRoles DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gaRolesRepository.deleteById(id);
  }
}
