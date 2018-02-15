const assert=require('chai').assert;
const Flag=require('../../src/models/flag.js');

describe('Flag',()=>{
  it('should return instance of flag',()=>{
    let flag = new Flag('red');
    let expected = {id:'F',name:'Flag',rank:0,team:'red'};
    let actual = flag;
    assert.deepEqual(expected,actual);
  });
});

