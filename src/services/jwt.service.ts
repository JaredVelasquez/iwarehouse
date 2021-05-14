import {BindingScope, injectable} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service_keys';
import {GaUsers} from '../models';
import {GaUsersRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt_decrypt_service';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(
    @repository(GaUsersRepository)
    public gaUsersRepository: GaUsersRepository,
  ) { }
  CrearTokenJWT(user: GaUsers) {
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        Mastercode: user.masterlistCode,
        Username: user.username,
        Role: user.roleId
      }
    }, keys.JWT_SECRET_KEY);
    return token;
  }

  VerificarTokenJWT(token: string) {
    try {
      let decoded = jwt.verify(token, keys.JWT_SECRET_KEY);
      return decoded;
    } catch {
      return null;
    }
  }

  async Identify(username: string, password: string): Promise<GaUsers | false> {
    let user = await this.gaUsersRepository.findOne({where: {username: username}});
    if (user) {
      let cryptPass = new EncryptDecrypt().Encrypt(password);

      if (user.password == cryptPass) {
        return user;
      }
    }
    return false;
  }

}
