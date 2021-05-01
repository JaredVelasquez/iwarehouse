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
import {WeMonitors} from '../models';
import {WeMonitorsRepository} from '../repositories';


@authenticate('admin', 'editor', 'reader')
export class MonitorsController {
  constructor(
    @repository(WeMonitorsRepository)
    public weMonitorsRepository: WeMonitorsRepository,
  ) { }

  @post('/we-monitors')
  @response(200, {
    description: 'WeMonitors model instance',
    content: {'application/json': {schema: getModelSchemaRef(WeMonitors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeMonitors, {
            title: 'NewWeMonitors',
            exclude: ['id'],
          }),
        },
      },
    })
    weMonitors: Omit<WeMonitors, 'id'>,
  ): Promise<WeMonitors> {
    return this.weMonitorsRepository.create(weMonitors);
  }

  @authenticate.skip()
  @get('/we-monitors/count')
  @response(200, {
    description: 'WeMonitors model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WeMonitors) where?: Where<WeMonitors>,
  ): Promise<Count> {
    return this.weMonitorsRepository.count(where);
  }

  @authenticate.skip()
  @get('/we-monitors')
  @response(200, {
    description: 'Array of WeMonitors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WeMonitors, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WeMonitors) filter?: Filter<WeMonitors>,
  ): Promise<WeMonitors[]> {
    return this.weMonitorsRepository.find(filter);
  }

  @patch('/we-monitors')
  @response(200, {
    description: 'WeMonitors PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeMonitors, {partial: true}),
        },
      },
    })
    weMonitors: WeMonitors,
    @param.where(WeMonitors) where?: Where<WeMonitors>,
  ): Promise<Count> {
    return this.weMonitorsRepository.updateAll(weMonitors, where);
  }

  @authenticate.skip()
  @get('/we-monitors/{id}')
  @response(200, {
    description: 'WeMonitors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WeMonitors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WeMonitors, {exclude: 'where'}) filter?: FilterExcludingWhere<WeMonitors>
  ): Promise<WeMonitors> {
    return this.weMonitorsRepository.findById(id, filter);
  }

  @patch('/we-monitors/{id}')
  @response(204, {
    description: 'WeMonitors PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeMonitors, {partial: true}),
        },
      },
    })
    weMonitors: WeMonitors,
  ): Promise<void> {
    await this.weMonitorsRepository.updateById(id, weMonitors);
  }

  @put('/we-monitors/{id}')
  @response(204, {
    description: 'WeMonitors PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weMonitors: WeMonitors,
  ): Promise<void> {
    await this.weMonitorsRepository.replaceById(id, weMonitors);
  }

  @del('/we-monitors/{id}')
  @response(204, {
    description: 'WeMonitors DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weMonitorsRepository.deleteById(id);
  }
}
