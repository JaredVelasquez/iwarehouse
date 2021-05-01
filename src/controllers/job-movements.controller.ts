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
import {PhJobMovements} from '../models';
import {PhJobMovementsRepository} from '../repositories';


@authenticate('admin', 'editor', 'reader')
export class JobMovementsController {
  constructor(
    @repository(PhJobMovementsRepository)
    public phJobMovementsRepository: PhJobMovementsRepository,
  ) { }

  @post('/ph-job-movements')
  @response(200, {
    description: 'PhJobMovements model instance',
    content: {'application/json': {schema: getModelSchemaRef(PhJobMovements)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhJobMovements, {
            title: 'NewPhJobMovements',
            exclude: ['id'],
          }),
        },
      },
    })
    phJobMovements: Omit<PhJobMovements, 'id'>,
  ): Promise<PhJobMovements> {
    return this.phJobMovementsRepository.create(phJobMovements);
  }


  @authenticate.skip()
  @get('/ph-job-movements/count')
  @response(200, {
    description: 'PhJobMovements model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PhJobMovements) where?: Where<PhJobMovements>,
  ): Promise<Count> {
    return this.phJobMovementsRepository.count(where);
  }

  @authenticate.skip()
  @get('/ph-job-movements')
  @response(200, {
    description: 'Array of PhJobMovements model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PhJobMovements, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PhJobMovements) filter?: Filter<PhJobMovements>,
  ): Promise<PhJobMovements[]> {
    return this.phJobMovementsRepository.find(filter);
  }

  @patch('/ph-job-movements')
  @response(200, {
    description: 'PhJobMovements PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhJobMovements, {partial: true}),
        },
      },
    })
    phJobMovements: PhJobMovements,
    @param.where(PhJobMovements) where?: Where<PhJobMovements>,
  ): Promise<Count> {
    return this.phJobMovementsRepository.updateAll(phJobMovements, where);
  }

  @authenticate.skip()
  @get('/ph-job-movements/{id}')
  @response(200, {
    description: 'PhJobMovements model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PhJobMovements, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PhJobMovements, {exclude: 'where'}) filter?: FilterExcludingWhere<PhJobMovements>
  ): Promise<PhJobMovements> {
    return this.phJobMovementsRepository.findById(id, filter);
  }

  @patch('/ph-job-movements/{id}')
  @response(204, {
    description: 'PhJobMovements PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhJobMovements, {partial: true}),
        },
      },
    })
    phJobMovements: PhJobMovements,
  ): Promise<void> {
    await this.phJobMovementsRepository.updateById(id, phJobMovements);
  }

  @put('/ph-job-movements/{id}')
  @response(204, {
    description: 'PhJobMovements PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() phJobMovements: PhJobMovements,
  ): Promise<void> {
    await this.phJobMovementsRepository.replaceById(id, phJobMovements);
  }

  @del('/ph-job-movements/{id}')
  @response(204, {
    description: 'PhJobMovements DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.phJobMovementsRepository.deleteById(id);
  }
}
