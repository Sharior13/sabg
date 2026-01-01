const express = require('express');
const app = express();
const port = 1300;

app.use(express.static('client'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});


//middleware
//redirect all routes to '/'
app.use((req, res)=>{
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});