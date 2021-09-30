import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'

const PORT = process.env.PORT || 3003
const DB_URL = 'mongodb+srv://AlVel:freedom24mon@cluster0.tpgmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


const app = express()
app.use(express.json())
app.use('/api',router)

app.get("/", (req, res)=> {
    console.log(req.query);
    res.status(200).json("сервер работает...")
})

const startApp = async()=> {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, ()=>console.log(`server started on port ${PORT}...`))
    } catch (e) {console.log(e)}
}

startApp()
