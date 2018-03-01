const assert=require('chai').assert;
const Sergeant=require('../../src/models/sergeant.js');

describe('Sergeant',()=>{
  it('should return instance of Sergeant',()=>{
    let sergeant = new Sergeant();
    let expected = {id:'4',name:'Sergeant',rank:4};
    let actual = sergeant;
    assert.deepEqual(expected,actual);
  });
});

