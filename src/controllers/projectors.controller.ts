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
import {WeProjectors} from '../models';
import {WeProjectorsRepository} from '../repositories';


@authenticate('admin', 'editor', 'reader')
export class ProjectorsController {
  constructor(
    @repository(WeProjectorsRepository)
    public weProjectorsRepository: WeProjectorsRepository,
  ) { }

  @post('/we-projectors')
  @response(200, {
    description: 'WeProjectors model instance',
    content: {'application/json': {schema: getModelSchemaRef(WeProjectors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeProjectors, {
            title: 'NewWeProjectors',
            exclude: ['id'],
          }),
        },
      },
    })
    weProjectors: Omit<WeProjectors, 'id'>,
  ): Promise<WeProjectors> {
    return this.weProjectorsRepository.create(weProjectors);
  }

  @authenticate.skip()
  @get('/we-projectors/count')
  @response(200, {
    description: 'WeProjectors model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WeProjectors) where?: Where<WeProjectors>,
  ): Promise<Count> {
    return this.weProjectorsRepository.count(where);
  }

  @authenticate.skip()
  @get('/we-projectors')
  @response(200, {
    description: 'Array of WeProjectors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WeProjectors, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WeProjectors) filter?: Filter<WeProjectors>,
  ): Promise<WeProjectors[]> {
    return this.weProjectorsRepository.find(filter);
  }

  @patch('/we-projectors')
  @response(200, {
    description: 'WeProjectors PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeProjectors, {partial: true}),
        },
      },
    })
    weProjectors: WeProjectors,
    @param.where(WeProjectors) where?: Where<WeProjectors>,
  ): Promise<Count> {
    return this.weProjectorsRepository.updateAll(weProjectors, where);
  }

  @authenticate.skip()
  @get('/we-projectors/{id}')
  @response(200, {
    description: 'WeProjectors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WeProjectors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WeProjectors, {exclude: 'where'}) filter?: FilterExcludingWhere<WeProjectors>
  ): Promise<WeProjectors> {
    return this.weProjectorsRepository.findById(id, filter);
  }

  @patch('/we-projectors/{id}')
  @response(204, {
    description: 'WeProjectors PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeProjectors, {partial: true}),
        },
      },
    })
    weProjectors: WeProjectors,
  ): Promise<void> {
    await this.weProjectorsRepository.updateById(id, weProjectors);
  }

  @put('/we-projectors/{id}')
  @response(204, {
    description: 'WeProjectors PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weProjectors: WeProjectors,
  ): Promise<void> {
    await this.weProjectorsRepository.replaceById(id, weProjectors);
  }

  @del('/we-projectors/{id}')
  @response(204, {
    description: 'WeProjectors DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weProjectorsRepository.deleteById(id);
  }
}
