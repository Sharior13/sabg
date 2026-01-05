const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentMap = null;
//add map image logic later
let mapImage = new Image();
mapImage.src = "../assets/map1.png";
const camera = { x: 0, y: 0 };

const setMap = (map)=>{
    currentMap = map;
}

const initiateRender = ()=>{

    const drawPlayer = ()=>{
        // console.log(window.gameState);
        for(const id in window.gameState.player){
            let p = window.gameState.player[id];
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
            drawWeapon(p);
        }
    }

    const drawMap = ()=>{
        ctx.save();
        ctx.drawImage(mapImage, 0, 0, currentMap.width, currentMap.height);
        ctx.restore();
    }

    const drawWeapon = (p)=>{
        const angle = p.input.angle;
        ctx.save();
        ctx.translate(p.position.x, p.position.y);
        ctx.rotate(angle);
        ctx.fillStyle = "black";
        ctx.fillRect(0, -12/2, 100, 12);
        ctx.restore();
    }
    const updateCamera = ()=>{
        camera.x = window.gameState.player[window.myId].position.x - canvas.width / 2;
        camera.y = window.gameState.player[window.myId].position.y - canvas.height / 2;

        camera.x = Math.max(0, Math.min(camera.x, currentMap.width - canvas.width));
        camera.y = Math.max(0, Math.min(camera.y, currentMap.height - canvas.height));
    }


    const animate = ()=>{
        requestAnimationFrame(animate);
        if(!window.gameState || !window.myId){
            return
        };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateCamera();
        ctx.save();
        ctx.translate(-camera.x, -camera.y);
        drawMap();
        drawPlayer();
        ctx.restore();
    }
    animate();
}

export { initiateRender, setMap, canvas, camera };