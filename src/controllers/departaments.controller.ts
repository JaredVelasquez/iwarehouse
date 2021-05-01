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
import {OeDepartments} from '../models';
import {OeDepartmentsRepository} from '../repositories';

@authenticate('admin', 'editor', 'reader')
export class DepartamentsController {
  constructor(
    @repository(OeDepartmentsRepository)
    public oeDepartmentsRepository: OeDepartmentsRepository,
  ) { }

  @post('/oe-departments')
  @response(200, {
    description: 'OeDepartments model instance',
    content: {'application/json': {schema: getModelSchemaRef(OeDepartments)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeDepartments, {
            title: 'NewOeDepartments',
            exclude: ['id'],
          }),
        },
      },
    })
    oeDepartments: Omit<OeDepartments, 'id'>,
  ): Promise<OeDepartments> {
    return this.oeDepartmentsRepository.create(oeDepartments);
  }

  @authenticate.skip()
  @get('/oe-departments/count')
  @response(200, {
    description: 'OeDepartments model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OeDepartments) where?: Where<OeDepartments>,
  ): Promise<Count> {
    return this.oeDepartmentsRepository.count(where);
  }

  @authenticate.skip()
  @get('/oe-departments')
  @response(200, {
    description: 'Array of OeDepartments model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OeDepartments, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OeDepartments) filter?: Filter<OeDepartments>,
  ): Promise<OeDepartments[]> {
    return this.oeDepartmentsRepository.find(filter);
  }

  @patch('/oe-departments')
  @response(200, {
    description: 'OeDepartments PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeDepartments, {partial: true}),
        },
      },
    })
    oeDepartments: OeDepartments,
    @param.where(OeDepartments) where?: Where<OeDepartments>,
  ): Promise<Count> {
    return this.oeDepartmentsRepository.updateAll(oeDepartments, where);
  }

  @authenticate.skip()
  @get('/oe-departments/{id}')
  @response(200, {
    description: 'OeDepartments model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OeDepartments, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OeDepartments, {exclude: 'where'}) filter?: FilterExcludingWhere<OeDepartments>
  ): Promise<OeDepartments> {
    return this.oeDepartmentsRepository.findById(id, filter);
  }

  @patch('/oe-departments/{id}')
  @response(204, {
    description: 'OeDepartments PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeDepartments, {partial: true}),
        },
      },
    })
    oeDepartments: OeDepartments,
  ): Promise<void> {
    await this.oeDepartmentsRepository.updateById(id, oeDepartments);
  }

  @put('/oe-departments/{id}')
  @response(204, {
    description: 'OeDepartments PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oeDepartments: OeDepartments,
  ): Promise<void> {
    await this.oeDepartmentsRepository.replaceById(id, oeDepartments);
  }

  @del('/oe-departments/{id}')
  @response(204, {
    description: 'OeDepartments DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oeDepartmentsRepository.deleteById(id);
  }
}
