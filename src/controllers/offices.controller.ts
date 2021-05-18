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
import {viewOf} from '../keys/viewOf.keys';
import {OeOffices} from '../models';
import {OeOfficesRepository} from '../repositories';


@authenticate('admin', 'editor', 'reader')
export class OfficesController {
  constructor(
    @repository(OeOfficesRepository)
    public oeOfficesRepository: OeOfficesRepository,
  ) { }

  @post('/oe-offices')
  @response(200, {
    description: 'OeOffices model instance',
    content: {'application/json': {schema: getModelSchemaRef(OeOffices)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeOffices, {
            title: 'NewOeOffices',
            exclude: ['id'],
          }),
        },
      },
    })
    oeOffices: Omit<OeOffices, 'id'>,
  ): Promise<OeOffices> {
    return this.oeOfficesRepository.create(oeOffices);
  }

  @authenticate.skip()
  @get('/oe-offices/count')
  @response(200, {
    description: 'OeOffices model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OeOffices) where?: Where<OeOffices>,
  ): Promise<Count> {
    return this.oeOfficesRepository.count(where);
  }

  @authenticate.skip()
  @get('/oe-offices')
  @response(200, {
    description: 'Array of OeOffices model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OeOffices, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OeOffices) filter?: Filter<OeOffices>,
  ): Promise<OeOffices[]> {
    return this.oeOfficesRepository.find(filter);
  }

  @patch('/oe-offices')
  @response(200, {
    description: 'OeOffices PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeOffices, {partial: true}),
        },
      },
    })
    oeOffices: OeOffices,
    @param.where(OeOffices) where?: Where<OeOffices>,
  ): Promise<Count> {
    return this.oeOfficesRepository.updateAll(oeOffices, where);
  }

  @authenticate.skip()
  @get('/oe-offices/{id}')
  @response(200, {
    description: 'OeOffices model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OeOffices, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OeOffices, {exclude: 'where'}) filter?: FilterExcludingWhere<OeOffices>
  ): Promise<OeOffices> {
    return this.oeOfficesRepository.findById(id, filter);
  }

  @patch('/oe-offices/{id}')
  @response(204, {
    description: 'OeOffices PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeOffices, {partial: true}),
        },
      },
    })
    oeOffices: OeOffices,
  ): Promise<void> {
    await this.oeOfficesRepository.updateById(id, oeOffices);
  }

  @put('/oe-offices/{id}')
  @response(204, {
    description: 'OeOffices PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oeOffices: OeOffices,
  ): Promise<void> {
    await this.oeOfficesRepository.replaceById(id, oeOffices);
  }

  @del('/oe-offices/{id}')
  @response(204, {
    description: 'OeOffices DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oeOfficesRepository.deleteById(id);
  }

  @get('/get-case-offices')
  async CasesOfices(): Promise<any> {
    let datos: any[] = await this.GetCasesOfices();
    return datos;
  }

  async GetCasesOfices() {
    return await this.oeOfficesRepository.dataSource.execute(viewOf.GetCasesOfices,);
  }

  @get('/get-monitors-offices')
  async MonitorsOfices(): Promise<any> {
    let datos: any[] = await this.GetMonitorsOfices();
    return datos;
  }

  async GetMonitorsOfices() {
    return await this.oeOfficesRepository.dataSource.execute(viewOf.GetMonitorsOfices,);
  }
}
