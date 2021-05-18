import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Roles} from '../keys/roles.keys';
import {JwtService} from '../services/jwt.service';
import {autheticate} from './Atenticate';
/**
 * Packages:
 * npm i @loopback/authentication
 * npm i @loopback/security
 * npm i parse-bearer-token
 */
export class AdministradorStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(JwtService)
    public authService: JwtService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud.")
    }
    let info = this.authService.VerifyToken(token);

    const profileData = autheticate(info, Roles.Administrator);

    return profileData;
  }
}
