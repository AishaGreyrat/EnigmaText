const bcrypt = require('bcrypt');
const connection = require('../database/connection');

const saltRounds = 10;

const userController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      // Aquí puedes usar la conexión a la base de datos para guardar el usuario
      // Ejemplo: await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
      res.send('Usuario registrado correctamente');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Error al registrar usuario');
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Aquí puedes usar la conexión a la base de datos para verificar las credenciales del usuario
      // Ejemplo: const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
      // Luego, comparar la contraseña hash con bcrypt.compare()
      res.send('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).send('Error al iniciar sesión');
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.send('Sesión cerrada correctamente');
  }
};

module.exports = userController;
