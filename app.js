const express = require('express')
const app = express()

const  dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload= require("express-fileupload");
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors())//for api communication  in react
app.use(cookieParser())//for getting  token in auth

//for file upload
app.use(fileUpload({useTempFiles:true}));

//for data gert in api
app.use(express.json())

connectDb()
// load route
app.use('/api',web)
//localhost:4000/api






// server creat 
app.listen(process.env.PORT,()=>{
    console.log(`server running on localhost: ${process.env.PORT}`)
})