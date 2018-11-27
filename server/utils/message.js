var moment = require('moment');

var generateMessage = (from,text)=>{
    // var d = new Date();
    // createdAt = d.getHours() + ':' + d.getMinutes();
    return{
        from,
        text,
        createdAt:moment
    };
};

var generateLocationmessage = (from,latitude,longitude)=>{
    return  {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment

    }
    
   
   };

module.exports = {generateMessage,generateLocationmessage};