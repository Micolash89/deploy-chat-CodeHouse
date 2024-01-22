import express from "express";

const viewsRouter = express();

viewsRouter.get('/', (req, res) => {

    res.render('chat', { style: 'chat.css' });

})

export default viewsRouter;