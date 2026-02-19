import db from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

db.connect(process.env.MONGO_URI)
.then(()=>{console.log("Conectado")})
.catch((e)=>{
    console.log(e.message)
})



export {db}