import { initiateSocket } from "./socket.js";
import { initiateRender } from "./renderer.js";
import { initiateInput } from "./input.js";
import { canvas, ctx } from "./renderer.js";

const titleForm = document.getElementById('titleForm');
const playerName = document.getElementById('playerName');
const playerBoard = document.getElementById('playerBoard');

const titleScreen = ()=>{
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Press ENTER to start", canvas.width/2 - 250, canvas.height/2, 500);
    ctx.closePath();

    titleForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        
        startGame();
    });
    
    const startGame = ()=>{
        titleForm.style.display = "none";
        playerBoard.style = `top:${-canvas.height}px;`;
        playerBoard.style.display = "block";
        
        initiateSocket(initiateInput(), playerName.value);
        initiateRender();
    }
    titleForm.style = `left:${canvas.width/2 - 250}px; top:${-canvas.height/2 + 100}px`;
};


titleScreen();
// initiateSocket(initiateInput());
// initiateRender();


export { titleScreen };