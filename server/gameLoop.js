const { Socket } = require('socket.io');
const state = require('./game/state.js');

module.exports = (io)=>{
    setInterval(()=>{
        io.emit('updateState', state);
        for(const id in state.player){
            p = state.player[id];
            if(!p.input){
                continue;
            }

            if(p.input['w']||p.input['ArrowUp']){
                p.position.y-=p.speed;
            }
            if(p.input['s']||p.input['ArrowDown']){
                p.position.y+=p.speed;
            }
            if(p.input['a']||p.input['ArrowLeft']){
                p.position.x-=p.speed;
            }
            if(p.input['d']||p.input['ArrowRight']){
                p.position.x+=p.speed;
            }
        }
    },1000/60);
}