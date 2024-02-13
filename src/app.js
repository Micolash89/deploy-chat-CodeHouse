import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import { Server } from "socket.io";

const app = express()

const httpServer = app.listen(8080, () => console.log("escuchando el puerto 8080"));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter)

let messages = [];

io.on('connection', socket => {
    console.log("nuevo cliente conectado");

    socket.on('newuser', username => {
        socket.broadcast.emit('update', username + ' Se unió a la conversación');
    });
    socket.on('exituser', username => {
        socket.broadcast.emit('update', username + ' Dejó la conversación');
    });
    socket.on('chat', message => {
        socket.broadcast.emit('chat', message);
    });

});

