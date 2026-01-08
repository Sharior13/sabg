const state = require('./state.js');
const { Bullet } = require('./entities.js');

const fireWeapon = (player, state, now)=>{

    let weapon = state.weapons[player.weapon];
    if(now - player.lastShot < 1000 / weapon.fireRate){
        return;
    }
    if(player.reload){
        setTimeout(()=>{
            player.ammo = weapon.ammo;
            player.reload = false;
        }, weapon.reloadTime);
        return;
    }
    if(player.ammo<=0){
        return;
    }

    player.ammo--;

    player.lastShot = now;

    let spread = (Math.random() - 0.5) * ((weapon.spread * Math.PI)/180);

    state.bullets.push(new Bullet({
        position: {
            x: player.position.x + Math.cos(player.input.angle) * weapon.width/2,
            y: player.position.y + Math.sin(player.input.angle) * weapon.width/2
        },
        angle: player.input.angle + spread,
        speed: weapon.speed,
        damage: weapon.damage,
        owner: player.id
    }))
};

module.exports = fireWeapon;