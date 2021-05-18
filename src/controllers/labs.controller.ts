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
import {OeLabs} from '../models';
import {OeLabsRepository} from '../repositories';


@authenticate('admin', 'editor', 'reader')
export class LabsController {
  constructor(
    @repository(OeLabsRepository)
    public oeLabsRepository: OeLabsRepository,
  ) { }

  @post('/oe-labs')
  @response(200, {
    description: 'OeLabs model instance',
    content: {'application/json': {schema: getModelSchemaRef(OeLabs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeLabs, {
            title: 'NewOeLabs',
            exclude: ['id'],
          }),
        },
      },
    })
    oeLabs: Omit<OeLabs, 'id'>,
  ): Promise<OeLabs> {
    return this.oeLabsRepository.create(oeLabs);
  }

  @authenticate.skip()
  @get('/oe-labs/count')
  @response(200, {
    description: 'OeLabs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OeLabs) where?: Where<OeLabs>,
  ): Promise<Count> {
    return this.oeLabsRepository.count(where);
  }

  @authenticate.skip()
  @get('/oe-labs')
  @response(200, {
    description: 'Array of OeLabs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OeLabs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OeLabs) filter?: Filter<OeLabs>,
  ): Promise<OeLabs[]> {
    return this.oeLabsRepository.find(filter);
  }

  @patch('/oe-labs')
  @response(200, {
    description: 'OeLabs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeLabs, {partial: true}),
        },
      },
    })
    oeLabs: OeLabs,
    @param.where(OeLabs) where?: Where<OeLabs>,
  ): Promise<Count> {
    return this.oeLabsRepository.updateAll(oeLabs, where);
  }

  @authenticate.skip()
  @get('/oe-labs/{id}')
  @response(200, {
    description: 'OeLabs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OeLabs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OeLabs, {exclude: 'where'}) filter?: FilterExcludingWhere<OeLabs>
  ): Promise<OeLabs> {
    return this.oeLabsRepository.findById(id, filter);
  }

  @patch('/oe-labs/{id}')
  @response(204, {
    description: 'OeLabs PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeLabs, {partial: true}),
        },
      },
    })
    oeLabs: OeLabs,
  ): Promise<void> {
    await this.oeLabsRepository.updateById(id, oeLabs);
  }

  @put('/oe-labs/{id}')
  @response(204, {
    description: 'OeLabs PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oeLabs: OeLabs,
  ): Promise<void> {
    await this.oeLabsRepository.replaceById(id, oeLabs);
  }

  @del('/oe-labs/{id}')
  @response(204, {
    description: 'OeLabs DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oeLabsRepository.deleteById(id);
  }

  @get('/get-cases-labs')
  async CasesLabs(): Promise<any> {
    let datos: any[] = await this.GetCasesLabs();
    return datos;
  }

  async GetCasesLabs() {
    return await this.oeLabsRepository.dataSource.execute(viewOf.GetCasesLabs,);
  }

  @get('/get-monitors-labs')
  async MonitorsLabs(): Promise<any> {
    let datos: any[] = await this.GetMonitorsLabs();
    return datos;
  }

  async GetMonitorsLabs() {
    return await this.oeLabsRepository.dataSource.execute(viewOf.GetMonitorsLabs,);
  }

  @get('/get-code-labs')
  async LabsCode(): Promise<any> {
    let datos: any[] = await this.GetLabsCode();
    return datos;
  }

  async GetLabsCode() {
    return await this.oeLabsRepository.dataSource.execute(viewOf.GetLabsCode,);
  }
}
