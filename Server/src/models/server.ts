import express, { Application, Request, Response } from 'express';
import routesCliente from '../routes/cliente';
import db from '../db/connection';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    console.log("PORT:", process.env.PORT);
    this.app = express();
    this.port = process.env.PORT ||'3001';
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log("Aplicación corriendo en el puerto", this.port);
    });
  }

  routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        msg: 'API working'
      });
    });
    this.app.use('/api/clientes', routesCliente);
  }

  midlewares() {
    //Parseamos el body, convertimos el json en un objeto
    this.app.use(express.json());
  }

  async dbConnect() {

    try {
      await db.authenticate();
      console.log("Base de datos conectada");
    }
    catch(error){
      console.log(error);
      console.log("Error al conectar con la base de datos");
    }
    
  }
}  

export default Server;