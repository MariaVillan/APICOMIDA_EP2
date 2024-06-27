const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken"); // Importa jsonwebtoken
const app = express();
const port = 3500;
const connectDB = require('./config/database');
const comidaRoute = require('./routes/comidaRoute');

// Configura la clave secreta para JWT
const JWT_SECRET = 'tu_clave_secreta_aqui'; // Reemplaza con tu clave secreta

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
  const token = req.headers['authorization']; // Token JWT enviado en los headers

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado, token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token no válido' });
    }
    req.usuario = usuario;
    next();
  });
}

// Rutas protegidas con JWT
app.use('/api', verificarToken, comidaRoute);

// Manejo de ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Aplicacion corriendo por el puerto ${port}`);
});
