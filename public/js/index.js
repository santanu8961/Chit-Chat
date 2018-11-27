var socket =  io();
socket.on('connection',()=>{
    console.log('Server fired..');

  
   

});
socket.on('disconnect',()=>{
    console.log("server disconnected");
});

socket.on('newEmail',(email)=>{
    console.log('Email connected..' ,email);
});

// https://www.google.com/maps?q=22.721300799999998,88.47411140000001

socket.on('newMessage',(message)=>{
    var formattedTime = moment(new Date()).format('h:mm a')
    console.log("newMessage",message);
    var li = `<li> ${message.from} : ${message.text}  <span style="float:right ">${formattedTime}</span></li>`;
    $('#messages').append(li);
});

socket.on('newLocationMessage',(message)=>{
    var li = `<li>${message.from} : <a href='${message.url}' target='_blank'>My current location</a></li>`;
    console.log(message.url)
    $('#messages').append(li); 
});

$('#message-form').on('submit',(e)=>{
    e.preventDefault();

    socket.emit('createMessage',{
        from:$("#user").val(),
        text: $("#name").val(),
    },()=>{
        $("#name").val(``);
    });
});


var locationButton = $("#send-location");
locationButton.on('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your Browser')
    }

    locationButton.attr('disabled','disabled').text('sending Location...');

    navigator.geolocation.getCurrentPosition((position)=>{
        locationButton.removeAttr('disabled').text('send Location');;
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },()=>{
        locationButton.removeAttr('disabled').text('send Location');
        alert('Unable to fetch Location');
    })
})
