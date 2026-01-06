const state = require('./state.js');
const { Bullet } = require('./entities.js');

const fireWeapon = (player, state, now)=>{
    let weapon = state.weapons[p.weapon];
    if(now - player.lastShot < 1000 / weapon.fireRate){
        return;
    }

    player.ammo--;
    if(player.ammo<=0){
        if(player.input['r']){
            setTimeout(()=>{
                player.ammo = weapon.ammo;
            }, weapon.reloadTime);
        }
        return;
    }
    player.lastShot = now;
    let spread = (Math.random() - 0.5) * ((weapon.spread * Math.PI)/180);
    state.bullets.push(new Bullet({
        position: {
            x: player.position.x + Math.cos(player.input.angle) * weapon.width/2,
            y: player.position.y + Math.sin(player.input.angle) * weapon.width/2
        },
        angle: p.input.angle + spread,
        speed: weapon.speed,
        damage: weapon.damage,
        owner: p.id
    }))
};

module.exports = fireWeapon;