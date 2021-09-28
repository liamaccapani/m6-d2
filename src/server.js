import express from "express";
import cors from "cors";
// import {pool} from "./utilities/database.js";
import createTables from "./utilities/create-tables.js";



const server = express()
const {PORT=5000} = process.env;

server.use(cors())
server.use(express.json())

server.listen(PORT,async ()=>{
    console.log(`Server is listening on port ${PORT}`)
    await createTables()
    // const result = await pool.query('SELECT NOW();')
    // console.log(result)
})

server.on('error',(error)=>{
    console.log('Server is stoppped ',error)
})