const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
var d = new Date(),
createdAt = d.getHours() + ':' + d.getMinutes();

const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

const server = http.createServer(app);
var io = socketIO(server);

var generatemessage = (a,b)=>{
 return  { from:a,text:b}

}


io.on('connection',(socket)=>{
    console.log('New User Connected..')

    // var d = new Date(),
    // createdAt = d.getHours() + ':' + d.getMinutes();

    // socket.emit('newMessage',{
    //     from:'',
    //     text: "",
    //     createdAt: createdAt
    // });
    

    socket.on('createMessage',(message) => {
        console.log('create message',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:createdAt
        })
    });

    socket.on("createLocationMessage",(cords)=>{
        io.emit('newMessage',generatemessage(`Location is`,`${cords.latitude} , ${cords.longitude}`))
    })

   

    socket.on('disconnect',()=>{
        console.log('user Disconnected');
    });
})


const port =  process.env.PORT || 3000 ;
server.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})



