//Importaciones
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserRouter from './routes/user.routes.js'

//Configuraciones
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', UserRouter);


const PORT= process.env.PORT||3001;

//API
app.get('/', (req, res)=>{
    res.send("Pruebas")
});

app.listen(PORT,()=>{
    console.log(`Estas conectado al servidor http://localhost:${PORT}`)
})
