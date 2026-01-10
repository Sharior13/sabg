const map = require('./map/map1.js');

class Player {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.radius = 48;
        this.health = 100;
        this.kills = 0;
        this.deaths = 0;
        this.isDead = false;
        this.deathTime = 0;
        this.position = {
            //change on map implementation
            x: Math.floor(Math.random() * (map.width-this.radius) + this.radius),
            y: Math.floor(Math.random() * (map.height-this.radius) + this.radius),
        };
        this.color = `hsl(${360 * Math.random()}, 100%, 50%)`;
        this.speed = 5;
        this.input = {};
        this.weapon = "assault";
        this.ammo = 30;
        this.shotsFired1 = 0;
        this.shotsFired2 = 0;
        this.lastShot = 0;
        this.reload = false;
    }
}

class Bullet {
    constructor({position, angle, speed, damage, owner}){
        this.radius = 6;
        this.position = position;
        this.angle = angle,
        this.speed = speed;
        this.damage = damage;
        this.owner = owner;
    }
}

module.exports = { Player, Bullet };