var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{

    it('should generate correct message object',()=>{
        var from = 'Santanu',
            text = 'ki korchis vai',
            message = generateMessage(from,text);

            expect(typeof message.createdAt).toBe('string');
            expect(message).toMatchObject({from,text});
    })

})