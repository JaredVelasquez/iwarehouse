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
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Masterlists} from '../models';
import {MasterlistsRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt_decrypt_service';
import {JwtService} from '../services/jwt.service';
const shortid = require('shortid');
class Credentials {
  username: string;
  password: string;
}

class PasswordResetData {
  username: string;
  phonenumber: string;
  newpassword: string;
}

class ChangePasswordData {
  id: string;
  currentPassword: string;
  newPassword: string;
}

@authenticate('admin')
export class MasterlistController {
  jwtService: JwtService;
  constructor(
    @repository(MasterlistsRepository)
    public masterlistsRepository: MasterlistsRepository,
  ) {

    this.jwtService = new JwtService(this.masterlistsRepository);
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
    let user = await this.jwtService.IdentifyToken(credentials.username, credentials.password);
    if (user) {
      let tk = await this.jwtService.createToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }


  @authenticate.skip()
  @post('/password-reset', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async reset(
    @requestBody() passwordResetData: PasswordResetData
  ): Promise<boolean> {
    let newpassword = await this.jwtService.ResetPassword(passwordResetData.username, passwordResetData.newpassword);
    if (newpassword) {
      return true;
    }
    throw new HttpErrors[400]("User not found");
  }

  @authenticate.skip()
  @post('/masterlists')
  @response(200, {
    description: 'Masterlists model instance',
    content: {'application/json': {schema: getModelSchemaRef(Masterlists)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Masterlists, {
            title: 'NewMasterlists',
            exclude: ['id'],
          }),
        },
      },
    })
    masterlists: Omit<Masterlists, 'id'>,
  ): Promise<Masterlists> {
    let auxdocpas = masterlists.passwordHash;
    masterlists.passwordHash = null;
    masterlists.status = "Active";
    masterlists.roleId = 2;
    masterlists.masterlistCode = shortid.generate();

    let passwordEncripted = new EncryptDecrypt().Encrypt(auxdocpas);
    masterlists.passwordHash = passwordEncripted;

    let m = await this.masterlistsRepository.create(masterlists);

    return m;
  }

  @get('/masterlists/count')
  @response(200, {
    description: 'Masterlists model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Masterlists) where?: Where<Masterlists>,
  ): Promise<Count> {
    return this.masterlistsRepository.count(where);
  }

  @get('/masterlists')
  @response(200, {
    description: 'Array of Masterlists model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Masterlists, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Masterlists) filter?: Filter<Masterlists>,
  ): Promise<Masterlists[]> {
    return this.masterlistsRepository.find(filter);
  }

  @patch('/masterlists')
  @response(200, {
    description: 'Masterlists PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Masterlists, {partial: true}),
        },
      },
    })
    masterlists: Masterlists,
    @param.where(Masterlists) where?: Where<Masterlists>,
  ): Promise<Count> {
    return this.masterlistsRepository.updateAll(masterlists, where);
  }

  @get('/masterlists/{id}')
  @response(200, {
    description: 'Masterlists model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Masterlists, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Masterlists, {exclude: 'where'}) filter?: FilterExcludingWhere<Masterlists>
  ): Promise<Masterlists> {
    return this.masterlistsRepository.findById(id, filter);
  }

  @patch('/masterlists/{id}')
  @response(204, {
    description: 'Masterlists PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Masterlists, {partial: true}),
        },
      },
    })
    masterlists: Masterlists,
  ): Promise<void> {
    await this.masterlistsRepository.updateById(id, masterlists);
  }

  @put('/masterlists/{id}')
  @response(204, {
    description: 'Masterlists PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() masterlists: Masterlists,
  ): Promise<void> {
    await this.masterlistsRepository.replaceById(id, masterlists);
  }

  @del('/masterlists/{id}')
  @response(204, {
    description: 'Masterlists DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.masterlistsRepository.deleteById(id);
  }
}
