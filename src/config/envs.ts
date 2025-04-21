import 'dotenv/config.js';
import pkg from "env-var";


const { get } = pkg;

export const envs = {

  PORT: get('PORT').default(3000).required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  JWT_SECRET: get('JWT_SECRET').default("SEED").required().asString(),  
}