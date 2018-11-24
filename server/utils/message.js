var generateMessage = (from,text)=>{
    var d = new Date(),
    createdAt = d.getHours() + ':' + d.getMinutes();
    return{
        from,
        text,
        createdAt:createdAt
    };
};

module.exports = {generateMessage};