const { Socket } = require('socket.io');
const state = require('./game/state.js');
const map = require('./game/map/map1.js');
const fireWeapon = require('./game/fireWeapon.js');
const { circleCollision, borderCollision}  = require('./game/collision.js');

const gameLoop = (io)=>{
    setInterval(()=>{
        const now = Date.now();

        //loop through every connected player
        for(const id in state.player){
            p = state.player[id];
            
            if(p.isDead && (now - p.deathTime) > 5000){
                p.isDead = false;
                p.health = 100;
                p.deathTime = 0;
            }
            
            if(p.isDead){
                continue;
            }
            
            if(p.health<=0){
                p.isDead = true;
                p.deathTime = now;

                //change position on respawn (complete after completing map implementation)
                // let x = mapSpawn[Math.floor(Math.random() * 2)];
                // let y = mapSpawn[Math.floor(Math.random() * 2)];
                // p.position = {
                //     x: x,
                //     y: y
                // };
            }

            for(const id2 in state.player){
                if(id == id2){
                    continue;
                }
                
                //player to player collision
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
            
            //update players based on input
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
            
            //ensure player is within the map
            p.position.x = Math.max(p.radius, Math.min(p.position.x, map.width-p.radius));
            p.position.y = Math.max(p.radius, Math.min(p.position.y, map.height-p.radius));


            //bullet to players collision
            for(let i=0; i<state.bullets.length; i++){
                if(circleCollision(p, state.bullets[i]) && p.id != state.bullets[i].owner){
                    p.health -= state.bullets[i].damage;
                    state.bullets.splice(i,1);
                    i--;
                }
            }
        }

        for(let i=0; i<state.bullets.length; i++){
            //bullet to map collision
            if(borderCollision(state.bullets[i])){
                state.bullets.splice(i,1);
                i--;
                continue;
            }

            //update bullets
            state.bullets[i].position.x += Math.cos(state.bullets[i].angle) * state.bullets[i].speed;
            state.bullets[i].position.y += Math.sin(state.bullets[i].angle) * state.bullets[i].speed;

        }

        io.emit('updateState', state);
    },1000/60);
}

module.exports = gameLoop;