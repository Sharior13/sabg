const express = require('express');
const { createServer} = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const port = 1300;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('client'));

app.get('/', (req, res)=>{
    res.sendFile(join(__dirname, 'index.html'));
});


//middleware

//redirect all routes to '/'
app.use((req, res)=>{
    res.redirect('/');
});


//handle socket events
const socketHandler = require('./socket/socketHandler.js');
socketHandler(io);


server.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});