const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

const server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New User Connected..')
    socket.on('disconnect',()=>{
        console.log('user Disconnected');
    })
})


const port =  process.env.PORT || 3000 ;
server.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})



