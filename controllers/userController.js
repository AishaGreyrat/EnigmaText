const usuarios = require('../database/tables/usuarios');

async function registrarUsuario(nombre, email, password_hash) {
    return await usuarios.registrarUsuario(nombre, email, password_hash);
}

async function obtenerUsuarioPorNombre(nombre) {
    return await usuarios.obtenerPorNombre(nombre);
}

async function obtenerUsuarioPorId(id) {
    return await usuarios.obtenerPorId(id);
}

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorId
};