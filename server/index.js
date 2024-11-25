import express from 'express'
import dotenv from 'dotenv'
const app = express()
import {router} from './routes/route.js' 
const port = 5000
import cors from 'cors'
import http from 'http'
import {Server} from "socket.io"
import { connectDb } from './db/connection.js'

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
    },
})
dotenv.config();
app.use(express.json());
connectDb();
app.use(cors(
    {
        origin: "*",
    }
))



app.get("/", (req, res) => {
    res.send(
        "<h1> Hello  <h1>"
    )
})
app.use("/api",router);

io.on("connection", (socket) => {
    console.log(socket.id, "connected")
    socket.emit("welcome", `welcome to chat server ${socket.id}`)
})
server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})