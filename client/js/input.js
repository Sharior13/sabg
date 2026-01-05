import { canvas, camera } from "./renderer.js";
const initiateInput = ()=>{
    const keys = {
        w: false,
        s: false,
        a: false,
        d: false,
        r: false,
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        " ": false,
        mouse: {
            x: 0,
            y: 0,
            clicked: false
        },
        angle: null
    };

    window.addEventListener('keydown',(event)=>{
        if(event.key in keys){
            keys[event.key] = true;
        }
    });
    window.addEventListener('keyup',(event)=>{
        if(event.key in keys){
            keys[event.key] = false;
        }
    });
    window.addEventListener('mousemove',(event)=>{
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        keys.mouse = {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        };
        if(window.gameState){
        keys.angle = Math.atan2(keys.mouse.y + camera.y - window.gameState.player[window.myId].position.y, keys.mouse.x + camera.x - window.gameState.player[window.myId].position.x);
    }
    });
    window.addEventListener('mousedown',()=>{
        keys.mouse.clicked = true;
    });
    window.addEventListener('mouseup',()=>{
        keys.mouse.clicked = false;
    });

    return keys;
};

export { initiateInput };