const { Player } = require('../game/entities.js');
const state = require('../game/state.js');
const map = require('../game/map/map1.js');

const socketHandler = (io)=>{

    //handle user connection
    io.on('connection', (socket)=>{
        console.log("user connected!");
        
        state.player[socket.id] = new Player(socket.id);

        socket.emit("id", socket.id);
        socket.emit('map',map);
        
        //handle user inputs
        socket.on('input',(input)=>{
            state.player[socket.id].input = input;
        });
        
        //handle user disconnection
        socket.on('disconnect', ()=>{
            console.log("user disconnected!");
            delete state.player[socket.id];
            io.emit('updateState', state);
        });
    });
}

module.exports = socketHandler;