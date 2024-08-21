"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCliente = exports.postCliente = exports.deleteCliente = exports.getCliente = exports.getClientes = void 0;
const getClientes = (req, res) => {
    res.json({
        msg: 'get Clientes'
    });
};
exports.getClientes = getClientes;
const getCliente = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'get Cliente',
        id
    });
};
exports.getCliente = getCliente;
const deleteCliente = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'delete Cliente',
        id
    });
};
exports.deleteCliente = deleteCliente;
const postCliente = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'post Cliente',
        body
    });
};
exports.postCliente = postCliente;
const updateCliente = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    res.json({
        msg: 'update Cliente',
        id,
        body
    });
};
exports.updateCliente = updateCliente;
