var socket =  io();
socket.on('connect',()=>{
    console.log('Server fired..');

  
    // socket.emit('createMessage',{
    //     from:'Goutami',
    //     text: "Nothings going on",
    //     createdAt: Date.now()
    // });

});
socket.on('disconnect',()=>{
    console.log("server disconnected");
});

socket.on('newEmail',(email)=>{
    console.log('Email connected..' ,email);
});

socket.on('newMessage',(message)=>{
    console.log("newMessage",message);
});