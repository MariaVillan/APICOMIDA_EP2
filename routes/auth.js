const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;
    const usuario = new Usuario({ nombre, contrasena });
    await usuario.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para autenticar un usuario
router.post('/login', async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;
    const usuario = await Usuario.findOne({ nombre });
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    const esMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
