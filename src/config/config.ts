//API Gateway Config
export const PORT: number = parseInt(process.env.PORT, 10) || 3000;
export const HOST = process.env.HOST || 'http://localhost';

//JWT Config
export const JWT_SECRET = process.env.SECRETKEY || 'secretKey';
export const JWT_EXPIRES_IN: number =
  parseInt(process.env.JWT_EXPIRES_IN, 10) || 3600;
export const JWT_ISSUER = process.env.JWT_ISSUER || 'Im the issuer';

//SECURITY CONFIG
export const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX, 10) || 10;
export const RATE_MAX_TTL = parseInt(process.env.RATE_MAX_TTL, 10) || 60000;

//Auth Microservice Config
export const AUTH_MICROSERVICE_NAME =
  process.env.AUTH_MICROSERVICE_NAME || 'AUTH_MICROSERVICE';
export const AUTH_URL = process.env.AUTH_URL || '127.0.0.1';
export const AUTH_PORT: number = parseInt(process.env.AUTH_PORT, 10) || 3001;

//Other Microservice Config
export const OTHER_MICROSERVICE_NAME =
  process.env.OTHER_MICROSERVICE_NAME || 'OTHER_MICROSERVICE';
export const OTHER_URL = process.env.OTHER_URL || '127.0.0.1';
export const OTHER_PORT: number = parseInt(process.env.OTHER_PORT, 10) || 3002;
