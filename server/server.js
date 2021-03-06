const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
var moment = require('moment');
var d = new Date();
const {generateMessage,generateLocationmessage} = require('./utils/message');
createdAt = d.getHours() + ':' + d.getMinutes();

const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

const server = http.createServer(app);
var io = socketIO(server);




io.on('connection',(socket)=>{
    console.log('New User Connected..')

    // var d = new Date(),
    // createdAt = d.getHours() + ':' + d.getMinutes();

    socket.emit('newMessage',{
        from:'',
        text: "New User Connected",
        createdAt: moment
    });
    

    socket.on('createMessage',(message,callback) => {
        console.log('create message',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:createdAt
        });
        callback();
    });

    socket.on("createLocationMessage",(coords)=>{
        io.emit('newLocationMessage',generateLocationmessage(`Location url`,coords.latitude,coords.longitude));
        console.log(coords);
    })

   

    socket.on('disconnect',()=>{
        console.log('user Disconnected');
        socket.emit('newMessage',{
            from:'',
            text: "User Dissconected",
            createdAt: moment
        });
    });
})


const port =  process.env.PORT || 3000 ;
server.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})



