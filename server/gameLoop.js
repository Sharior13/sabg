const { Socket } = require('socket.io');
const state = require('./game/state.js');
const map = require('./game/map/map1.js')
const fireWeapon = require('./game/fireWeapon.js');

const gameLoop = (io)=>{
    setInterval(()=>{
        const now = Date.now();
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
            if(p.input.clicked){
                fireWeapon(p, state, now);
            }
            
            p.position.x = Math.max(p.radius, Math.min(p.position.x, map.width-p.radius));
            p.position.y = Math.max(p.radius, Math.min(p.position.y, map.height-p.radius));
        }

        for(let i=0; i<state.bullets.length; i++){
            state.bullets[i].position.x += Math.cos(state.bullets[i].angle) * state.bullets[i].speed;
            state.bullets[i].position.y += Math.sin(state.bullets[i].angle) * state.bullets[i].speed;
        }

        io.emit('updateState', state);
    },1000/60);
}

module.exports = gameLoop;