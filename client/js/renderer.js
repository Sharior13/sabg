import { titleScreen } from "./main.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isRendering = false;

let currentMap = null;
//add map image logic later
let mapImage = new Image();
mapImage.src = "../assets/map1.png";

const camera = { 
    x: 0, 
    y: 0 
};

const setMap = (map)=>{
    currentMap = map;
};

const playerBoard = document.getElementById('playerBoard');


const displayLeaderboard = (player)=>{
    playerBoard.innerHTML = "";
        for(let i=0; i<player.length; i++){
            let p = player[i];
            playerBoard.innerHTML += `<div>${p.name}: ${p.score}</div>`;
        }
    };


const initiateRender = ()=>{
    if(isRendering){
        return;
    }

    //draw all connected players
    const drawPlayer = ()=>{
        for(const id in window.gameState.player){
            let p = window.gameState.player[id];
            
            drawBullets(p);

            //skip rendering dead players and show death message for current player
            if(p.isDead){
                if(p.id == window.myId){
                    displayDeath(p);
                }
                continue;
            }
            drawWeapon(p);

            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
    };

    const drawMap = ()=>{
        ctx.save();
        ctx.drawImage(mapImage, 0, 0, currentMap.width, currentMap.height);
        ctx.restore();
    };

    const drawWeapon = (p)=>{
        const weapon = window.gameState.weapons[p.weapon];
        const angle = p.input.angle;
        ctx.save();
        ctx.beginPath();
        ctx.translate(p.position.x, p.position.y);
        ctx.rotate(angle);
        ctx.fillStyle = "black";
        ctx.fillRect(0, -weapon.height/2, weapon.width, weapon.height);
        ctx.closePath();
        ctx.restore();
    };
    
    const drawBullets = (p)=>{
        for(let i=0; i<window.gameState.bullets.length; i++){
            let bullet = window.gameState.bullets[i];
            if(bullet.owner == p.id){
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(bullet.position.x, bullet.position.y, bullet.radius, 0, Math.PI*2);
                ctx.fill();
                ctx.closePath();
            }
        }
    };

    const displayDeath = (p)=>{
        ctx.save();
        ctx.resetTransform();
        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("You died LMAOOOO", canvas.width/2-250, canvas.height/2, 500);
        ctx.fillText(`Respawning in ${(5 - (Date.now() - p.deathTime)/1000).toFixed(2)}...`, canvas.width/2-250, canvas.height/2 + 100, 500);
        ctx.closePath();
        ctx.restore();
    };

    //update current player's viewport
    const updateCamera = ()=>{
        camera.x = window.gameState.player[window.myId].position.x - canvas.width / 2;
        camera.y = window.gameState.player[window.myId].position.y - canvas.height / 2;

        camera.x = Math.max(0, Math.min(camera.x, currentMap.width - canvas.width));
        camera.y = Math.max(0, Math.min(camera.y, currentMap.height - canvas.height));
    };


    //frontend game loop
    const animate = ()=>{
        requestAnimationFrame(animate);
        if(!window.gameState || !window.myId){
            return
        };
        if(window.gameState.hasEnded){
            if(window.gameState.gameEndTime && (Date.now() - window.gameState.gameEndTime) > 5000){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                playerBoard.innerHTML = "";
                playerBoard.style.display = "none";

                window.gameState = null;
                isRendering = false;
                titleScreen();
            }
            // endScreen();
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateCamera();
        ctx.save();
        ctx.translate(-camera.x, -camera.y);
        drawMap();
        drawPlayer();
        ctx.restore();
    }
    animate();
};

export { initiateRender, setMap, displayLeaderboard, canvas, ctx, camera };