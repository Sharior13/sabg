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

    titleForm.style = `left:${canvas.width/2 - 250}px; top:${-canvas.height/2 + 100}px`;
};

const startGame = ()=>{
    titleForm.style.display = "none";
    let username = titleForm.input.value;
    
    initiateSocket(initiateInput());
    initiateRender();
}

titleScreen();
// initiateSocket(initiateInput());
// initiateRender();