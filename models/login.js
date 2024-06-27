const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Usuario = require('../models/comida');

// Configura la clave secreta para JWT
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; // Reemplaza con tu clave secreta

// Función para generar un token JWT
function generarToken(usuario) {
  // El token expira en 1 hora (3600 segundos)
  return jwt.sign({ usuario }, JWT_SECRET, { expiresIn: '1h' });
}

// Ruta de inicio de sesión para obtener el token JWT
router.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    // Aquí deberías implementar la lógica de autenticación
    // Por ejemplo, encontrar el usuario en tu base de datos y verificar las credenciales
    const usuarioAutenticado = await Usuario.findOne({ usuario, contraseña });

    if (!usuarioAutenticado) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar un token JWT válido
    const token = generarToken({ id: usuarioAutenticado._id, usuario: usuarioAutenticado.usuario });
    res.json({ mensaje: 'Inicio de sesión exitoso', token });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
});

// Otras rutas y lógica de tu API...

module.exports = router;
