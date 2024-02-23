import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import { Server } from "socket.io";
import mongoose, { mongo } from "mongoose";
import config from "./config/config.js";
import Message from "./dao/classes/message.dao.js";

const app = express()

const httpServer = app.listen(config.port, () => console.log(`escuchando el puerto ${config.port}`));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter)

let messages = [];//aplicar mongodb en  vez de un array , dao , model , managerdb

mongoose.connect(config.mongoUrl);
const messageManager = new Message();

io.on('connection', socket => {
    console.log("nuevo cliente conectado");

    socket.on('newuser', async username => {
        if (username != config.clave)
            socket.broadcast.emit('update', username + ' Se unió a la conversación');
        else {
            await messageManager.deleteMessages();
            socket.emit('delete', {});
        }
    });
    socket.on('exituser', username => {
        socket.broadcast.emit('update', username + ' Dejó la conversación');
    });
    socket.on('chat', async message => {
        socket.broadcast.emit('chat', message);
        await messageManager.saveMessage(message);
    });

    socket.on('allMessages', async () => {
        const allMsgs = await messageManager.getMessages();
        socket.emit('allMessages', allMsgs);
    });

});

