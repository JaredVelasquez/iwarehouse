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
  getModelSchemaRef,





  HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {GaUsers} from '../models';
import {GaUsersRepository} from '../repositories';
import {JwtService} from '../services/jwt.service';

class Credentials {
  username: string;
  password: string;
}

class PasswordResetData {
  username: string;
  type: number;
}

class ChangePasswordData {
  id: number;
  currentPassword: string;
  newPassword: string;
}

@authenticate('admin')
export class GaUsersController {
  authService: JwtService;
  constructor(
    @repository(GaUsersRepository)
    public gaUsersRepository: GaUsersRepository,
  ) {

    this.authService = new JwtService(this.gaUsersRepository);
  }

  @post('/ga-users')
  @response(200, {
    description: 'GaUsers model instance',
    content: {'application/json': {schema: getModelSchemaRef(GaUsers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GaUsers, {
            title: 'NewGaUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    gaUsers: Omit<GaUsers, 'id'>,
  ): Promise<GaUsers> {
    return this.gaUsersRepository.create(gaUsers);
  }

  @authenticate.skip()
  @post('/login', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    let user = await this.authService.Identify(credentials.username, credentials.password);
    if (user) {
      let tk = await this.authService.CrearTokenJWT(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }

  @get('/ga-users/count')
  @response(200, {
    description: 'GaUsers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GaUsers) where?: Where<GaUsers>,
  ): Promise<Count> {
    return this.gaUsersRepository.count(where);
  }

  @get('/ga-users')
  @response(200, {
    description: 'Array of GaUsers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GaUsers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GaUsers) filter?: Filter<GaUsers>,
  ): Promise<GaUsers[]> {
    return this.gaUsersRepository.find(filter);
  }

  @patch('/ga-users')
  @response(200, {
    description: 'GaUsers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GaUsers, {partial: true}),
        },
      },
    })
    gaUsers: GaUsers,
    @param.where(GaUsers) where?: Where<GaUsers>,
  ): Promise<Count> {
    return this.gaUsersRepository.updateAll(gaUsers, where);
  }

  @get('/ga-users/{id}')
  @response(200, {
    description: 'GaUsers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GaUsers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GaUsers, {exclude: 'where'}) filter?: FilterExcludingWhere<GaUsers>
  ): Promise<GaUsers> {
    return this.gaUsersRepository.findById(id, filter);
  }

  @patch('/ga-users/{id}')
  @response(204, {
    description: 'GaUsers PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GaUsers, {partial: true}),
        },
      },
    })
    gaUsers: GaUsers,
  ): Promise<void> {
    await this.gaUsersRepository.updateById(id, gaUsers);
  }

  @put('/ga-users/{id}')
  @response(204, {
    description: 'GaUsers PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gaUsers: GaUsers,
  ): Promise<void> {
    await this.gaUsersRepository.replaceById(id, gaUsers);
  }

  @del('/ga-users/{id}')
  @response(204, {
    description: 'GaUsers DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gaUsersRepository.deleteById(id);
  }
}
