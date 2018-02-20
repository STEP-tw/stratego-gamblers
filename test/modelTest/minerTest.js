const assert=require('chai').assert;
const Miner=require('../../src/models/miner.js');

describe('Miner',()=>{
  it('should return instance of Miner',()=>{
    let miner = new Miner();
    let expected = {id:'3',name:'Miner',rank:3};
    let actual = miner;
    assert.deepEqual(expected,actual);
  });
});

