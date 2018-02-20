const assert=require('chai').assert;
const Position=require('../../src/models/position.js');


describe('Position',()=>{
  describe('#getNeighbours',()=>{
    it('should return all neighbour positions',()=>{
      let position=new Position('2_2');
      assert.sameMembers(position.getNeighbourPos(),['2_3','2_1','1_2','3_2']);
    });
    it('should return two neighbour positions for bottom-left pos',()=>{
      let position=new Position('0_0');
      assert.sameMembers(position.getNeighbourPos(),['0_1','1_0']);
    });
    it('should return two neighbour positions for top-right pos',()=>{
      let position=new Position('9_9');
      assert.sameMembers(position.getNeighbourPos(),['9_8','8_9']);
    });
  });
});