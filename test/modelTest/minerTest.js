const assert=require('chai').assert;
const Miner=require('../../src/models/miner.js');

describe('Miner',()=>{
  it('should return instance of Miner for red team',()=>{
    let miner = new Miner('red');
    let expected = {id:'3',name:'Miner',rank:3,team:'red'};
    let actual = miner;
    assert.deepEqual(expected,actual);
  });
  it('should return instance of Miner for blue team',()=>{
    let miner = new Miner('blue');
    let expected = {id:'3',name:'Miner',rank:3,team:'blue'};
    let actual = miner;
    assert.deepEqual(expected,actual);
  });
});

