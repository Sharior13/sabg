class Player {
    constructor(){
        this.position = {
            x: Math.floor(Math.random() * (700-50) + 50),
            y: Math.floor(Math.random() * (700-50) + 50),
        };
        this.radius = 50;
        this.size = {
            width: 200,
            height: 200
        };
        this.color = `hsl(${360 * Math.random()}, 100%, 50%)`;
        this.speed = 10;
        this.input = {};
    }
}

module.exports = Player;