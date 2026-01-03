const Player = require('../game/player.js');
const state = require('../game/state.js');

module.exports = (io)=>{
    io.on('connection', (socket)=>{
        console.log("user connected!");
        
        state.player[socket.id] = new Player();

        socket.on('input',(input)=>{
            state.player[socket.id].input = input;
        })
        
        socket.on('disconnect', ()=>{
            console.log("user disconnected!");
            delete state.player[socket.id];
            io.emit('updateState', state);
        });
    });
}