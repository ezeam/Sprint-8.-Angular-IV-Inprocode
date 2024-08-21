"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cliente_1 = __importDefault(require("../routes/cliente"));
class Server {
    constructor() {
        console.log("PORT:", process.env.PORT);
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación corriendo en el puerto", this.port);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API working'
            });
        });
        this.app.use('/api/clientes', cliente_1.default);
    }
    midlewares() {
        //Parseamos el body, convertimos el json en un objeto
        this.app.use(express_1.default.json());
    }
}
exports.default = Server;
