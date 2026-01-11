import { initiateSocket } from "./socket.js";
import { initiateRender } from "./renderer.js";
import { initiateInput } from "./input.js";
import { canvas, ctx } from "./renderer.js";
const titleForm = document.getElementById('titleForm');

const titleScreen = ()=>{
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Press ENTER to start", canvas.width/2 - 250, canvas.height/2, 500);
    ctx.closePath();

    titleForm.style = `left:${canvas.width/2+100}px; top:${-canvas.height/2}px`;

    const titleListener = window.addEventListener("keydown", (event)=>{
        if(event.key == "Enter"){
            window.removeEventListener("keydown", titleListener);
            titleForm.style.display = "none";
            
            initiateSocket(initiateInput());
            initiateRender();
        }
    });
};

titleScreen();
// initiateSocket(initiateInput());
// initiateRender();