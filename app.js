const express = require("express");
const morgan = require("morgan");
const comidaRoute = require('./routes/comidaRoute');
const authRouter = require('./routes/auth');
const autenticar = require('./middleware/autenticar');
const connectDB = require('./config/database'); // Asegúrate de que la ruta es correcta

const app = express();
const port = process.env.PORT || 3500; // Cambia esto para usar el puerto proporcionado por Render

connectDB(); // Llama a la función para conectar con la base de datos

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', authRouter); // Autenticación

app.use('/api', autenticar, comidaRoute); // Protección

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});
