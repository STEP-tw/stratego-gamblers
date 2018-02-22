const assert=require('chai').assert;
const Marshal=require('../../src/models/marshal.js');
const General=require('../../src/models/general.js');

describe('Marshal',()=>{
  it('should return instance of Marshal',()=>{
    let marshal = new Marshal();
    let expected = {id:'10',name:'Marshal',rank:10};
    let actual = marshal;
    assert.deepEqual(expected,actual);
  });
  describe('attackedBy',()=>{
    it('should attacking piece when attacked on marshal',()=>{
      let general = new General();     
      let marshal = new Marshal();    
      let actual = marshal.attackedBy(general);
      let expected = {attackingPiece: true, defendingPiece: false};
      assert.deepEqual(actual,expected);
    });
    it('should kill both pieces when marshal attacks marshal',()=>{   
      let marshal = new Marshal();    
      let actual = marshal.attackedBy(marshal);
      let expected = {attackingPiece: true, defendingPiece: true};
      assert.deepEqual(actual,expected);
    });
  });
});

