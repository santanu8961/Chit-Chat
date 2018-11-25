var generateMessage = (from,text)=>{
    var d = new Date(),
    createdAt = d.getHours() + ':' + d.getMinutes();
    return{
        from,
        text,
        createdAt:createdAt
    };
};

var generateLocationmessage = (from,latitude,longitude)=>{
    return  {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()

    }
    
   
   };

module.exports = {generateMessage,generateLocationmessage};