import { /* inject, */ BindingScope, injectable} from '@loopback/core';
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

  /**
   * Creación de un token JWT
   */
  CrearTokenJWT(user: GaUsers) {
    let claveSecreta = keys.JWT_SECRET_KEY;
    let tk = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        Mastercode: user.masterlistCode,
        Username: user.username,
        Role: user.roleId
      }
    }, claveSecreta);
    return tk;
  }

  /**
   * Verificar un token
   */
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

    console.log(`Username: ${user?.username} - Password: ${user?.password}`);
    if (user) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(password);
      let cryptPass2 = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(cryptPass);

      console.log(`cryptPass: ${cryptPass}`);
      console.log(`cryptPass2: ${cryptPass2}`);
      if (user.password == cryptPass2) {
        return user;
      }
    }
    return false;
  }

}
