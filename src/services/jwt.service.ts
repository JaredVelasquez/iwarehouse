import {BindingScope, injectable} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service_keys';
import {Masterlists} from '../models';
import {MasterlistsRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt_decrypt_service';
const jsonwebtoken = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(
    @repository(MasterlistsRepository)
    public masterlistsRepository: MasterlistsRepository,
  ) { }

  createToken(user: Masterlists) {
    let token = jsonwebtoken.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        UserID: user.masterlistCode,
        UserNAME: user.username,
        Role: user.roleId
      }
    }, keys.JWT_SECRET_KEY);
    return token;
  }

  VerifyToken(token: string) {
    try {
      let decoded = jsonwebtoken.verify(token, keys.JWT_SECRET_KEY);
      return decoded;
    } catch {
      return null;
    }
  }

  async IdentifyToken(username: string, password: string): Promise<Masterlists | false> {
    let user = await this.masterlistsRepository.findOne({where: {username: username}});
    if (!user) {
      user = await this.masterlistsRepository.findOne({where: {email: username}});
    }
    if (user) {
      let cryptPass = new EncryptDecrypt().Encrypt(password);
      if (user.passwordHash == cryptPass) {
        return user;
      }
    }
    return false;
  }

  async ResetPassword(email: string, newpassword: string): Promise<string | false> {
    let user = await this.masterlistsRepository.findOne({where: {email: email}});
    if (user) {
      newpassword = new EncryptDecrypt().Encrypt(newpassword);
      user.passwordHash = newpassword;
      this.masterlistsRepository.replaceById(user.masterlistCode, user);
      return newpassword;
    }
    return false;
  }

}
