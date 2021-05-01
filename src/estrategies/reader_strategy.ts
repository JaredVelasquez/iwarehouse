import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services/jwt.service';
/**
 * Packages:
 * npm i @loopback/authentication
 * npm i @loopback/security
 * npm i parse-bearer-token
 */
export class AdministradorStrategy implements AuthenticationStrategy {
  name: string = 'reader';

  constructor(
    @service(JwtService)
    public authService: JwtService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud.")
    }
    let info = this.authService.VerificarTokenJWT(token);
    if (info) {
      if (info.data.Role == '3') {
        let perfil: UserProfile = Object.assign({
          masterlistCode: info.data.Mastercode,
          username: info.data.Username,
          role: info.data.Role
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("El token es válido, pero no tiene los permisos suficientes para ejecutar esta acción.")
      }
    } else {
      throw new HttpErrors[401]("El token enviado no es válido.")
    }
  }
}
