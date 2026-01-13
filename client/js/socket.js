import { setMap, displayLeaderboard } from "./renderer.js";
const initiateSocket = (input, playerName)=>{
    const socket = io();

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
        console.log(window.gameState.scores);
    });
    //get map from backend
    socket.on("map", (map) => {
        setMap(map);
    });

    //send input to backend
    setInterval(()=>{
        socket.emit('input', input);
    }, 1000/60);
    //send player name to backend
    socket.emit('playerName', playerName);
}
export { initiateSocket };