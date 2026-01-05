const initiateSocket = (setMap, input)=>{
    const socket = io();

    socket.on('id', (id)=>{
        window.myId = id;
    })
    socket.on('updateState',(backEndState)=>{
        console.log("maybe working fine");
        //interpolation in fuuture??
        window.gameState = backEndState;
        // console.log(window.gameState);
    });
    socket.on("map", (map) => {
        setMap(map);
    });

    setInterval(()=>{
        socket.emit('input', input);
    }, 1000/60);
}
export { initiateSocket };