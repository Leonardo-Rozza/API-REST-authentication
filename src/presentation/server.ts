import express, { Router } from 'express';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options:Options) {
    const { port = 3000, routes } = options;

    this.port = port;
    this.routes = routes;
  }
  


  async start() {

    //Middleware para parsear el body de las peticiones
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true })) //Para aceptar datos de formularios www-form-urlencoded

    //Usar las rutas definidas en el router
    this.app.use(this.routes)

    //Puerto de escucha
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    })
  }
}
