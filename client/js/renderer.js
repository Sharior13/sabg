const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const devicePixelRatio = window.devicePixelRatio || 1;

canvas.width = window.innerWidth*devicePixelRatio;
canvas.height = window.innerHeight*devicePixelRatio;

const initiateRender = ()=>{

    const drawPlayer = ()=>{
        // console.log(window.gameState);
        for(const id in window.gameState.player){
            let player = window.gameState.player[id];
            ctx.beginPath();
            ctx.fillStyle = player.color;
            ctx.arc(player.position.x, player.position.y, player.radius*devicePixelRatio, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
    }


    const animate = ()=>{
        requestAnimationFrame(animate);
        if(!window.gameState){
            return
        };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
    }
    animate();
}

export { initiateRender };