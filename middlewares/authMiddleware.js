// authMiddleware.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

//Configura DotEnv
dotenv.config();

async function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;

        // Verificar créditos para usuarios no autenticados
        verificarCreditos(req, res, next);

    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

// Función para generar un token JWT
function generateToken(userId) {
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

async function getHash(passwordString) {
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    const password_hash = await bcrypt.hash(passwordString, saltRounds);
    return password_hash;
}



async function comparePassword(passwordString, bdHash) {
    console.log('passwordString',passwordString)
    console.log('bdHash',bdHash)
    const compareHashes = await bcrypt.compare(passwordString, bdHash);
    return compareHashes;   
}


function cargarScripts(req, res, next) {
    // Ruta de la carpeta de scripts
    const scriptsFolder = path.join(__dirname, '../public/js');

    // Escanear la carpeta de scripts
    fs.readdir(scriptsFolder, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta de scripts:', err);
            return next();
        }

        // Filtrar solo los archivos JavaScript
        const jsFiles = files.filter(file => path.extname(file) === '.js');

        // Agregar las rutas de los scripts a la variable locals
        res.locals.scripts = jsFiles.map(file => `/js/${file}`);

        next();
    });
}



module.exports = {
    authenticate,
    generateToken,
    getHash,
    comparePassword,
    cargarScripts
};