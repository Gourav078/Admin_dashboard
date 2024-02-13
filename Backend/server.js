const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.json())
app.use(express.static('public'))
const dataRoute = require("./src/router/dataRouter")
const dbConfig = require('./src/config/db')

const dotenv = require('dotenv')
app.use(cors());

dotenv.config();

app.use("/api",dataRoute)

dbConfig().then(()=>{
    app.listen(process.env.PORT || 8081,()=>{
        console.log(`Server running at ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log('db connection failed',err)
})







