import 'dotenv/config';
import pkg from "env-var";


const { get } = pkg;

export const envs = {

  PORT: get('PORT').default(3000).required().asPortNumber(),

  

}