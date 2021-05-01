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
import {WeCases} from '../models';
import {WeCasesRepository} from '../repositories';

@authenticate('admin', 'editor', 'reader')
export class CasesController {
  constructor(
    @repository(WeCasesRepository)
    public weCasesRepository: WeCasesRepository,
  ) { }

  @post('/we-cases')
  @response(200, {
    description: 'WeCases model instance',
    content: {'application/json': {schema: getModelSchemaRef(WeCases)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeCases, {
            title: 'NewWeCases',
            exclude: ['id'],
          }),
        },
      },
    })
    weCases: Omit<WeCases, 'id'>,
  ): Promise<WeCases> {
    return this.weCasesRepository.create(weCases);
  }

  @authenticate.skip()
  @get('/we-cases/count')
  @response(200, {
    description: 'WeCases model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WeCases) where?: Where<WeCases>,
  ): Promise<Count> {
    return this.weCasesRepository.count(where);
  }

  @authenticate.skip()
  @get('/we-cases')
  @response(200, {
    description: 'Array of WeCases model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WeCases, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WeCases) filter?: Filter<WeCases>,
  ): Promise<WeCases[]> {
    return this.weCasesRepository.find(filter);
  }


  @patch('/we-cases')
  @response(200, {
    description: 'WeCases PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeCases, {partial: true}),
        },
      },
    })
    weCases: WeCases,
    @param.where(WeCases) where?: Where<WeCases>,
  ): Promise<Count> {
    return this.weCasesRepository.updateAll(weCases, where);
  }

  @authenticate.skip()
  @get('/we-cases/{id}')
  @response(200, {
    description: 'WeCases model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WeCases, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WeCases, {exclude: 'where'}) filter?: FilterExcludingWhere<WeCases>
  ): Promise<WeCases> {
    return this.weCasesRepository.findById(id, filter);
  }

  @patch('/we-cases/{id}')
  @response(204, {
    description: 'WeCases PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeCases, {partial: true}),
        },
      },
    })
    weCases: WeCases,
  ): Promise<void> {
    await this.weCasesRepository.updateById(id, weCases);
  }

  @put('/we-cases/{id}')
  @response(204, {
    description: 'WeCases PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weCases: WeCases,
  ): Promise<void> {
    await this.weCasesRepository.replaceById(id, weCases);
  }

  @del('/we-cases/{id}')
  @response(204, {
    description: 'WeCases DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weCasesRepository.deleteById(id);
  }
}
