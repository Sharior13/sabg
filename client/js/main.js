import { initiateSocket } from "./socket.js";
import { initiateRender } from "./renderer.js";
import { initiateInput } from "./input.js";
import { canvas, ctx } from "./renderer.js";

const titleScreen = ()=>{
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Press ENTER to start", canvas.width/2 - 250, canvas.height/2, 500);
    ctx.closePath();

    const titleListener = window.addEventListener("keydown", (event)=>{
        if(event.key == "Enter"){
            window.removeEventListener("keydown", titleListener);
            initiateSocket(initiateInput());
            initiateRender();
        }
    });
};

titleScreen();
// initiateSocket(initiateInput());
// initiateRender();