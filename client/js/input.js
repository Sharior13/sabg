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
        }
    };

    window.addEventListener('keydown',(event)=>{
        if(event.key in keys){
            keys[event.key] = true;
            console.log(event.key);
        }
    });
    window.addEventListener('keyup',(event)=>{
        if(event.key in keys){
            keys[event.key] = false;
        }
    });
    window.addEventListener('mousemove',(event)=>{
        keys.mouse = {
            x: event.clientX,
            y: event.clientY
        };
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