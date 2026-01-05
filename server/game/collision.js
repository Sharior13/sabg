const { collisions } = require("./map/map1.js");
const state = require('./game/state.js');


const collisionMap = []
for(let i=0;i<collisions.length;i+=30){
    collisionMap.push(collisions.slice(i,i+30));
}