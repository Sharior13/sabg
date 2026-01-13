const state = require('./game/state.js');
const map = require('./game/map/map1.js');
const fireWeapon = require('./game/fireWeapon.js');
const { circleCollision, borderCollision}  = require('./game/collision.js');

const gameLoop = (io)=>{
    setInterval(()=>{
        const now = Date.now();

        //loop through every connected player
        for(const id in state.player){
            let p = state.player[id];
            let weapon = state.weapons[p.weapon];
            
            //player respawn logic
            if(p.isDead && (now - p.deathTime) > 5000){
                p.isDead = false;
                p.health = 100;
                p.deathTime = 0;

                //change position on respawn (complete after completing map implementation)
                // let x = mapSpawn[Math.floor(Math.random() * 2)];
                // let y = mapSpawn[Math.floor(Math.random() * 2)];
                p.position = {
                    x: Math.floor(Math.random() * (map.width-p.radius) + p.radius),
                    y: Math.floor(Math.random() * (map.height-p.radius) + p.radius),
                };
            }
            
            if(p.isDead){
                continue;
            }

            for(const id2 in state.player){
                if(id == id2){
                    continue;
                }
                
                //player to player collision
                p2 = state.player[id2];
                if(circleCollision(p, p2) && (!p.isDead || !p2.isDead)){
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
            if(p.input['1']){
                p.weapon = "assault";
                p.ammo = weapon.ammo - p.shotsFired1;
                p.reload = false;
            }
            if(p.input['2']){
                p.weapon = "pistol";
                p.ammo = weapon.ammo - p.shotsFired2;
                p.reload = false;
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

                    //player death logic
                    if(p.health<=0){
                        p.isDead = true;
                        p.deathTime = now;
                        p.deaths++;
                        state.player[state.bullets[i].owner].kills++;
                    }
                    
                    state.bullets.splice(i,1);
                    i--;
                }
            }

            //scoring logic
            p.score = p.kills;
            if(p.score < 0){
                p.score = 0;
            }

        }
        state.scores = Object.values(state.player);
        state.scores.sort((a,b)=>{
            a.score - b.score;
        });
        console.log(state.scores);

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