const express = require ("express")
const morgan = require ("morgan");
const jwt = require ("jsonwebtoken")
const app = express()
const port = 3500
const connectDB = require('./config/database');
const authRouter = require('./routes/auth');
const autenticar = require('./middleware/autenticar');
const comidaRoute = require('./routes/comidaRoute')

connectDB();

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(morgan('dev'))

app.use('/api', comidaRoute)

<<<<<<< HEAD
// Autenticación
app.use('/api', authRouter);

// Protección
app.use('/api', autenticar, comidaRoute);
=======
>>>>>>> 721ec55f89db2007c16aa7abf8c7fa79cea0d197


app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port,()=> {
    console.log(`Aplicacion corriendo por el puerto ${port}`)
})


