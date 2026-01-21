import { setMap, displayLeaderboard } from "./renderer.js";

let socket = null;
let inputInterval = null;

const initiateSocket = (input, playerName)=>{
    if(socket){
        return;
    }

    socket = io();
    
    //get current player id
    socket.on('id', (id)=>{
        window.myId = id;
    })
    
    socket.on('updateState',(backEndState)=>{
        console.log("maybe working fine");
        //interpolation in fuuture??
        
        //update gamestate
        window.gameState = backEndState;
        displayLeaderboard(window.gameState.scores);

        //disconnect player on game end
        if(window.gameState.hasEnded){
            cleanupSocket();
        }
    });

    //get map from backend
    socket.on("map", (map) => {
        setMap(map);
    });

    //send input to backend
    inputInterval = setInterval(()=>{
        if(socket){
            socket.emit('input', input);
        }
    }, 1000/60);

    //send player name to backend
    socket.emit('playerName', playerName);
}

const cleanupSocket = ()=>{

    //handle player disconnect after game ends
    if(inputInterval){
        clearInterval(inputInterval);
        inputInterval = null;
    }

    if(socket){
        socket.off();
        socket.disconnect();
        socket = null;
    }
}
export { initiateSocket, cleanupSocket };