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
import {PhJobs} from '../models';
import {PhJobsRepository} from '../repositories';

@authenticate('admin', 'editor', 'reader')
export class JobsController {
  constructor(
    @repository(PhJobsRepository)
    public phJobsRepository: PhJobsRepository,
  ) { }

  @post('/ph-jobs')
  @response(200, {
    description: 'PhJobs model instance',
    content: {'application/json': {schema: getModelSchemaRef(PhJobs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhJobs, {
            title: 'NewPhJobs',
            exclude: ['id'],
          }),
        },
      },
    })
    phJobs: Omit<PhJobs, 'id'>,
  ): Promise<PhJobs> {
    return this.phJobsRepository.create(phJobs);
  }

  @authenticate.skip()
  @get('/ph-jobs/count')
  @response(200, {
    description: 'PhJobs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PhJobs) where?: Where<PhJobs>,
  ): Promise<Count> {
    return this.phJobsRepository.count(where);
  }

  @authenticate.skip()
  @get('/ph-jobs')
  @response(200, {
    description: 'Array of PhJobs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PhJobs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PhJobs) filter?: Filter<PhJobs>,
  ): Promise<PhJobs[]> {
    return this.phJobsRepository.find(filter);
  }

  @patch('/ph-jobs')
  @response(200, {
    description: 'PhJobs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhJobs, {partial: true}),
        },
      },
    })
    phJobs: PhJobs,
    @param.where(PhJobs) where?: Where<PhJobs>,
  ): Promise<Count> {
    return this.phJobsRepository.updateAll(phJobs, where);
  }

  @authenticate.skip()
  @get('/ph-jobs/{id}')
  @response(200, {
    description: 'PhJobs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PhJobs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PhJobs, {exclude: 'where'}) filter?: FilterExcludingWhere<PhJobs>
  ): Promise<PhJobs> {
    return this.phJobsRepository.findById(id, filter);
  }

  @patch('/ph-jobs/{id}')
  @response(204, {
    description: 'PhJobs PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhJobs, {partial: true}),
        },
      },
    })
    phJobs: PhJobs,
  ): Promise<void> {
    await this.phJobsRepository.updateById(id, phJobs);
  }

  @put('/ph-jobs/{id}')
  @response(204, {
    description: 'PhJobs PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() phJobs: PhJobs,
  ): Promise<void> {
    await this.phJobsRepository.replaceById(id, phJobs);
  }

  @del('/ph-jobs/{id}')
  @response(204, {
    description: 'PhJobs DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.phJobsRepository.deleteById(id);
  }
}
