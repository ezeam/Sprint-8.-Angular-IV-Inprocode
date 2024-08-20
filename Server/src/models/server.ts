import express, { Application } from 'express';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    console.log("PORT:", process.env.PORT);
    this.app = express();
    this.port = process.env.PORT ||'3001';
    this.listen();
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log("Aplicación corriendo en el puerto", this.port);
    });
  }
}
export default Server;