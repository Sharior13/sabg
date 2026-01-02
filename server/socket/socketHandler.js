module.exports = (io)=>{
    io.on('connection', (socket)=>{
        console.log("an user connected!");

        socket.on('disconnect', ()=>{
            console.log("user disconnected!");
        });
    });
}