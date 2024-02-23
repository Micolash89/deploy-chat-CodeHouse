# Proyecto de WebSocket con Node.js

Este proyecto es parte del curso de CodeHouse Backend y se centra en implementar un servidor WebSocket utilizando Node.js.

## Descripción

Este proyecto utiliza WebSocket para permitir la comunicación en tiempo real entre clientes y el servidor. Además, se utiliza Handlebars para las vistas, lo que permite generar contenido HTML de forma dinámica en el servidor.

## Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [MongoDB](https://www.mongodb.com/) (a través de Mongoose)
- [Socket.IO](https://socket.io/)

## Deploy

- Este proyecto está desplegado en [Glitch](https://glitch.com/) y puedes acceder a él en el siguiente enlace:

  - [pagina web del proyecto](https://rectangular-carbonated-kookaburra.glitch.me)


- Configuracion del packcage.json para que funcione en Glitch:
```
{
  "name": "clase11",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/app.js"
  },
  "engines": {
    "node": "14.x"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "express-handlebars": "^7.1.2",
    "mongoose": "^8.2.0",
    "socket.io": "^4.7.2"
  }
}  
```

## Capturas de pantalla

<p align='center'>
<img src='https://i.imgur.com/Rrnaahu.png' width='85%'>
<img src='https://i.imgur.com/yv7BR2T.png' width='85%'>
<img src='https://i.imgur.com/VsoaEIg.png' width='85%'>
</p>
