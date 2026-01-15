const { Player } = require('../game/entities.js');
const state = require('../game/state.js');
const map = require('../game/map/map1.js');

const socketHandler = (io)=>{

    io.on('connection', (socket)=>{
        //handle user connection
        socket.on('playerName', (playerName)=>{
            console.log("user connected!");
            state.player[socket.id] = new Player(socket.id, playerName);
            socket.emit("id", socket.id);
        });

        socket.emit('map',map);
        
        //handle user inputs
        socket.on('input', (input)=>{
            if(state.player[socket.id]){
                state.player[socket.id].input = input;
            }
        });
        
        //handle user disconnection
        socket.on('disconnect', ()=>{
            console.log("user disconnected!");
            delete state.player[socket.id];
            io.emit('updateState', state);
        });

        //disconnect player
        if(state.hasEnded){
            socket.disconnect(true);
        }
    });
}

module.exports = socketHandler;