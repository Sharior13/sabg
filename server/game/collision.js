const state = require('./state.js');
const map = require('./map/map1.js');

//collision detetction between two circles
const circleCollision = (circleA, circleB)=>{
    let radii = circleA.radius + circleB.radius;
    let distanceX = circleA.position.x - circleB.position.x;
    let distanceY = circleA.position.y - circleB.position.y;
    let distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

    return (distance <= radii);
};

//collision detection between map border and circles
const borderCollision = (circle) =>{
    return (circle.position.x > map.width || circle.position.x < 0 || circle.position.y > map.height || circle.position.y < 0);
}

module.exports = { circleCollision, borderCollision };