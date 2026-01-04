const initiateSocket = (input)=>{
    const socket = io();

    socket.on('updateState',(backEndState)=>{
        console.log("maybe working fine");
        //interpolation in fuuture??
        window.gameState = backEndState;
        // console.log(window.gameState);
    });
    setInterval(()=>{
        socket.emit('input', input);
    }, 1000/60);
}
export { initiateSocket };