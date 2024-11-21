import express from 'express'
const app = express()
const port = 5000
import cors from 'cors'
import http from 'http'
import {Server} from "socket.io"

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
    },
})

io.on("connection", (socket) => {
    console.log(socket.id, "connected")
    socket.emit("welcome", `welcome to chat server ${socket.id}`)
})

app.get("/", (req, res) => {
    res.send(
        "<h1> Hello  <h1>"
    )
})

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})