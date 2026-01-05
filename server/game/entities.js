const map = require('./map/map1.js');

class Player {
    constructor(id){
        this.id = id;
        this.radius = 48;
        this.position = {
            x: Math.floor(Math.random() * (map.width-this.radius) + this.radius),
            y: Math.floor(Math.random() * (map.height-this.radius) + this.radius),
        };
        // this.size = {
        //     width: 200,
        //     height: 200
        // };
        this.color = `hsl(${360 * Math.random()}, 100%, 50%)`;
        this.speed = 5;
        this.input = {};
        this.weapon = "assault";
        this.lastShot = 0
    }
}

class Bullet {
    constructor(){}
}

module.exports = { Player, Bullet };