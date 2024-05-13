const usuarioModel = require('../models/usuarioModel');
const authMiddleWare = require('../middlewares/authMiddleware');

async function registrarUsuario(req, res) {
    const { nombre, email, password, confirmPassword } = req.body;
    try {
        // Verificar si la contraseña y su confirmación coinciden
        if (password !== confirmPassword) {
            return res.status(400).send('Las contraseñas no coinciden');
        }

        // Verificar si el usuario ya está registrado
        const usuarioExistente = await usuarioModel.obtenerPorNombre(nombre);
        if (usuarioExistente) {
            return res.status(400).send('El usuario ya está registrado');
        }

        // Hash de la contraseña
        const hashedPassword = await authMiddleWare.getHash(password);

        // Registrar el usuario en la base de datos
        await usuarioModel.registrar(nombre, email, hashedPassword);

        // Usuario insertado correctamente
        res.redirect('/login');
    } catch (error) {
        console.log("error en el registro");
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
}

async function obtenerUsuarioPorNombre(req, res) {
    try {
        const { nombre } = req.params;
        const usuario = await usuarioModel.obtenerPorNombre(nombre);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener usuario por nombre');
    }
}

async function obtenerUsuarioPorId(req, res) {
    try {
        const { id } = req.params;
        const usuario = await usuarioModel.obtenerPorId(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener usuario por ID');
    }
}

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorId,
};
