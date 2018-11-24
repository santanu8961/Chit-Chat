var socket =  io();
socket.on('connect',()=>{
    console.log('Server fired..');

  
   

});
socket.on('disconnect',()=>{
    console.log("server disconnected");
});

socket.on('newEmail',(email)=>{
    console.log('Email connected..' ,email);
});

socket.on('newMessage',(message)=>{
    console.log("newMessage",message);
    var li = `<li> ${message.from} : ${message.text}`;
    $('#messages').append(li);
});

$('#message-form').on('submit',(e)=>{
    e.preventDefault();

    socket.emit('createMessage',{
        from:$("#user").val(),
        text: $("#name").val(),
        createdAt: Date.now()
    },()=>{

    });
});


var locationButton = $("#send-location");
locationButton.on('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your Browser')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },(err)=>{
        alert('Unable to fetch Location');
    })
})
