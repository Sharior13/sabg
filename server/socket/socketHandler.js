const { Player } = require('../game/entities.js');
const state = require('../game/state.js');
const map = require('../game/map/map1.js');

module.exports = (io)=>{
    io.on('connection', (socket)=>{
        console.log("user connected!");
        
        state.player[socket.id] = new Player();

        socket.emit("id", socket.id);
        socket.emit('map',map);
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