const express = require("express")
require('dotenv').config()
require('./src/db/connect')

const CityRouter = require("./src/router/City.Router");
const AdventureRouter = require('./src/router/Adventure.Router')
const AdventureDetailRouter = require('./src/router/AdventureDetail.Router')

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

const server = express() 

server.use(express.json())

server.use("/cities", CityRouter);

server.use("/adventures",AdventureRouter)

server.use("/adventureDetail",AdventureDetailRouter)

server.listen(PORT, ()=>{
    console.log(`Server started successfully in  ${NODE_ENV} at PORT - ${PORT}`)
})