import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {viewOf} from '../keys/viewOf.keys';
import {OeClassRooms} from '../models';
import {OeClassRoomsRepository} from '../repositories';

@authenticate('admin', 'editor', 'reader')
export class ClassRomsController {
  constructor(
    @repository(OeClassRoomsRepository)
    public oeClassRoomsRepository: OeClassRoomsRepository,
  ) { }

  @authenticate.skip()
  @post('/oe-class-rooms')
  @response(200, {
    description: 'OeClassRooms model instance',
    content: {'application/json': {schema: getModelSchemaRef(OeClassRooms)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeClassRooms, {
            title: 'NewOeClassRooms',
            exclude: ['id'],
          }),
        },
      },
    })
    oeClassRooms: Omit<OeClassRooms, 'id'>,
  ): Promise<OeClassRooms> {
    return this.oeClassRoomsRepository.create(oeClassRooms);
  }

  @authenticate.skip()
  @get('/oe-class-rooms/count')
  @response(200, {
    description: 'OeClassRooms model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OeClassRooms) where?: Where<OeClassRooms>,
  ): Promise<Count> {
    return this.oeClassRoomsRepository.count(where);
  }

  @authenticate.skip()
  @get('/oe-class-rooms')
  @response(200, {
    description: 'Array of OeClassRooms model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OeClassRooms, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OeClassRooms) filter?: Filter<OeClassRooms>,
  ): Promise<OeClassRooms[]> {
    return this.oeClassRoomsRepository.find(filter);
  }

  @patch('/oe-class-rooms')
  @response(200, {
    description: 'OeClassRooms PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeClassRooms, {partial: true}),
        },
      },
    })
    oeClassRooms: OeClassRooms,
    @param.where(OeClassRooms) where?: Where<OeClassRooms>,
  ): Promise<Count> {
    return this.oeClassRoomsRepository.updateAll(oeClassRooms, where);
  }

  @authenticate.skip()
  @get('/oe-class-rooms/{id}')
  @response(200, {
    description: 'OeClassRooms model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OeClassRooms, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OeClassRooms, {exclude: 'where'}) filter?: FilterExcludingWhere<OeClassRooms>
  ): Promise<OeClassRooms> {
    return this.oeClassRoomsRepository.findById(id, filter);
  }

  @patch('/oe-class-rooms/{id}')
  @response(204, {
    description: 'OeClassRooms PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OeClassRooms, {partial: true}),
        },
      },
    })
    oeClassRooms: OeClassRooms,
  ): Promise<void> {
    await this.oeClassRoomsRepository.updateById(id, oeClassRooms);
  }

  @put('/oe-class-rooms/{id}')
  @response(204, {
    description: 'OeClassRooms PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oeClassRooms: OeClassRooms,
  ): Promise<void> {
    await this.oeClassRoomsRepository.replaceById(id, oeClassRooms);
  }

  @del('/oe-class-rooms/{id}')
  @response(204, {
    description: 'OeClassRooms DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oeClassRoomsRepository.deleteById(id);
  }

  @get('/get-case-rooms')
  async CasesClassRooms(): Promise<any> {
    let datos: any[] = await this.GetCasesClassRooms();
    return datos;
  }

  async GetCasesClassRooms() {
    return await this.oeClassRoomsRepository.dataSource.execute(viewOf.GetCasesClassRooms,);
  }

  @get('/get-monitors-rooms')
  async MonitorsClassRooms(): Promise<any> {
    let datos: any[] = await this.GetMonitorsClassRooms();
    return datos;
  }

  async GetMonitorsClassRooms() {
    return await this.oeClassRoomsRepository.dataSource.execute(viewOf.GetMonitorsClassRooms,);
  }

  @get('/get-projectors-rooms')
  async ProjectorsClassRooms(): Promise<any> {
    let datos: any[] = await this.GetProjectorsClassRooms();
    return datos;
  }

  async GetProjectorsClassRooms() {
    return await this.oeClassRoomsRepository.dataSource.execute(viewOf.GetProjectorsClassRooms,);
  }

  @get('/get-code-rooms')
  async ClassRoomsCode(): Promise<any> {
    let datos: any[] = await this.GetClassRoomsCode();
    return datos;
  }

  async GetClassRoomsCode() {
    return await this.oeClassRoomsRepository.dataSource.execute(viewOf.GetClassRoomsCode,);
  }
}
