const { Socket } = require('socket.io');
const state = require('./game/state.js');
const map = require('./game/map/map1.js');
const fireWeapon = require('./game/fireWeapon.js');
const { circleCollision, borderCollision}  = require('./game/collision.js');

const gameLoop = (io)=>{
    setInterval(()=>{
        const now = Date.now();
        for(const id in state.player){
            p = state.player[id];
            if(!p.input){
                continue;
            }
            for(const id2 in state.player){
                if(id == id2){
                    continue;
                }
                p2 = state.player[id2];
                if(circleCollision(state.player[id], state.player[id2])){
                    if(p.position.x > p2.position.x){
                        p2.position.x-=p2.speed;
                    }
                    if(p.position.x < p2.position.x){
                        p2.position.x+=p2.speed;
                    }
                    if(p.position.y > p2.position.y){
                        p2.position.y-=p2.speed;
                    }
                    if(p.position.y < p2.position.y){
                        p2.position.y+=p2.speed;
                    }
                }
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
            if(p.input['r']){
                p.reload = true;
                fireWeapon(p, state, now);
            }
            if(p.input.clicked){
                fireWeapon(p, state, now);
            }
            
            p.position.x = Math.max(p.radius, Math.min(p.position.x, map.width-p.radius));
            p.position.y = Math.max(p.radius, Math.min(p.position.y, map.height-p.radius));


            for(let i=0; i<state.bullets.length; i++){
                if(circleCollision(p, state.bullets[i]) && p.id != state.bullets[i].owner){
                    console.log("DHAPPAAAAA");

                }
            }
        }


        for(let i=0; i<state.bullets.length; i++){
            if(borderCollision(state.bullets[i])){
                state.bullets.splice(i,1);
                i--;
                console.log("gayoooo");
                continue;
            }
            state.bullets[i].position.x += Math.cos(state.bullets[i].angle) * state.bullets[i].speed;
            state.bullets[i].position.y += Math.sin(state.bullets[i].angle) * state.bullets[i].speed;

        }

        io.emit('updateState', state);
    },1000/60);
}

module.exports = gameLoop;