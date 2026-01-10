const state = require('./state.js');
const { Bullet } = require('./entities.js');

const fireWeapon = (player, state, now)=>{

    let weapon = state.weapons[player.weapon];

    //return if firing too fast
    if(now - player.lastShot < 1000 / weapon.fireRate){
        return;
    }

    //reloading logic
    if(player.reload){
        if(now - player.lastShot > weapon.reloadTime){
            player.ammo = weapon.ammo;
            player.reload = false;
        }
        return;
    }

    //return if no ammo
    if(player.ammo<=0){
        return;
    }

    player.ammo--;

    //keep track of individual weapon ammo
    if(player.weapon == "pistol"){
        player.shotsFired2++;
    }
    else{
        player.shotsFired1++;
    }

    player.lastShot = now;

    let spread = (Math.random() - 0.5) * ((weapon.spread * Math.PI)/180);

    //push a new bullet into an array everytimes a player fires
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