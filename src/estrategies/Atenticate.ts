import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';

export const autheticate = async (info: any, role: string) => {

  const {Mastercode, Username, Role} = info.data;
  if (info) {
    if (info.data.Role == role) {
      let profile: UserProfile = Object.assign({
        masterlistCode: info.data.Mastercode,
        username: info.data.Username,
        role: info.data.Role
      });
      return profile;
    } else {
      throw new HttpErrors[401]("El token es válido, pero no tiene los permisos suficientes para ejecutar esta acción.")
    }
  } else {
    throw new HttpErrors[401]("El token enviado no es válido.")
  }
}
