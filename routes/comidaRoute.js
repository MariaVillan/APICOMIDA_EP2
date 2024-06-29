const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Comida = require('../models/comida');
<<<<<<< HEAD
const autenticar = require('../middleware/autenticar');
=======
require('dotenv').config();
>>>>>>> 721ec55f89db2007c16aa7abf8c7fa79cea0d197

router.get('/comida', async (req, res) => {
  try {
    const comidas = await Comida.find();
    res.json(comidas);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

<<<<<<< HEAD
=======
// RUTA PARA INICIAR SESIÓN
router.post('/login', (req, res) => {
  const usuario = { id: 3 };
  const token = jwt.sign({ usuario }, process.env.SECRET_KEY);
  
  res.json({
    token
  });
});

// FUNCIÓN PARA VERIFICAR TOKEN
function asegurarToken(req, res, next) {
  const encabezadoBearer = req.headers['authorization'];
  if (typeof encabezadoBearer !== 'undefined') {
    const bearer = encabezadoBearer.split(' ');
    const tokenBearer = bearer[1];
    req.token = tokenBearer;
    next();
  } else {
    res.sendStatus(403);
  }
}

// CONSULTAR POR NOMBRE
>>>>>>> 721ec55f89db2007c16aa7abf8c7fa79cea0d197
router.get('/comida/:nombre', obtenerComidaPorNombre, (req, res) => {
  res.json(res.comida);
});

router.get('/comida/categoria/:categoria', async (req, res) => {
  try {
    const comidas = await Comida.find({ categoria: req.params.categoria });
    if (comidas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron comidas' });
    }
    res.json(comidas);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

<<<<<<< HEAD
router.post('/comida', autenticar, async (req, res) => {
=======
// INSERTAR
router.post('/comida', asegurarToken, async (req, res) => {
>>>>>>> 721ec55f89db2007c16aa7abf8c7fa79cea0d197
  const comida = new Comida({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria
  });

  try {
    const comidaAgregada = await comida.save();
    res.status(201).json(comidaAgregada);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

<<<<<<< HEAD
router.put('/comida/:nombre', autenticar, obtenerComidaPorNombre, async (req, res) => {
=======
// ACTUALIZAR
router.put('/comida/:nombre', asegurarToken, obtenerComidaPorNombre, async (req, res) => {
>>>>>>> 721ec55f89db2007c16aa7abf8c7fa79cea0d197
  if (req.body.nombre != null) {
    res.comida.nombre = req.body.nombre;
  }
  if (req.body.precio != null) {
    res.comida.precio = req.body.precio;
  }
  if (req.body.descripcion != null) {
    res.comida.descripcion = req.body.descripcion;
  }
  if (req.body.categoria != null) {
    res.comida.categoria = req.body.categoria;
  }

  try {
    const comidaActualizada = await res.comida.save();
    res.json(comidaActualizada);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

<<<<<<< HEAD
router.delete('/comida/:nombre', autenticar, async (req, res) => {
=======
// ELIMINAR POR NOMBRE
router.delete('/comida/:nombre', asegurarToken, async (req, res) => {
>>>>>>> 721ec55f89db2007c16aa7abf8c7fa79cea0d197
  try {
    const comidaEliminada = await Comida.findOneAndDelete({ nombre: req.params.nombre });
    if (!comidaEliminada) {
      return res.status(404).json({ mensaje: 'No se encontró la comida' });
    }
    res.json({ mensaje: 'Comida eliminada' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

async function obtenerComidaPorNombre(req, res, next) {
  let comida;
  try {
    comida = await Comida.findOne({ nombre: req.params.nombre });
    if (comida == null) {
      return res.status(404).json({ mensaje: 'Comida no encontrada'});
    }
  } catch (err) {
    return res.status(500).json({ mensaje: err.message });
  }

  res.comida = comida;
  next();
}

module.exports = router;
