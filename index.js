//Importaciones
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import UserRouter from './routes/user.routes.js'
import CartaRouter from './routes/carta.routes.js'
import ReservaRouter from './routes/reserva.routes.js'
//Configuraciones
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', UserRouter); 
app.use('/carta', CartaRouter)
app.use('/reserva', ReservaRouter)

const PORT= process.env.PORT||3001;

//API
app.get('/', (req, res)=>{
    res.send("Pruebas")
});

app.listen(PORT,()=>{
    console.log(`Estas conectado al servidor http://localhost:${PORT}`)
})
