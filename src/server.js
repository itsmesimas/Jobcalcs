const express = require('express');
const server = express();
const routes = require('./routes');
const path = require('path');

//Habilitanto template engine
server.set('view engine', 'ejs');

//mudando localização da views
server.set('views', path.join(__dirname, 'views'));

//habilitar arquivos statics
server.use(express.static('public'));

// usar req.body
server.use(express.urlencoded({ extended: true }));

//routes
server.use(routes);

server.listen(3000, () => console.log('Servidor rodando'));
