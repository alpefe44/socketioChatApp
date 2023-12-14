import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express();
const port = 3000;

app.use(cors());

const server = http.createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
    console.log(socket.id , "user connected")

    socket.on('room', (data) => {
        console.log(data)
        socket.join(data)
    })


    socket.on('message', (data) => {
        console.log(data)
        io.to(data.room).emit('messageReturn', data)
    
    })
})



server.listen(port, () => {
    console.log("Sunucu çalıştı")
})
