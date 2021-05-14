export namespace ServiceKeys {
  export const LOGIN_CRYPT_METHOD = "md5";
  export const JWT_SECRET_KEY = 'JWT@SecretKey*';
  export const TOKEN_EXPIRATION_TIME = (Date.now() / 1000) + (60 * 60 * 10);
}
