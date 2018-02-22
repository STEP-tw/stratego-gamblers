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
  describe('#getAllPosAhead', () => {
    it('should return all ahead positions of a piece', () => {
      let position=new Position('5_5');
      assert.sameMembers(position.getAllPosAhead(),['5_6','5_7','5_8','5_9']);
    });
  });
  describe('#getAllPosBack', () => {
    it('should return all back positions of a piece', () => {
      let position=new Position('5_5');
      let expected = ['5_4','5_3','5_2','5_1','5_0'];
      assert.sameMembers(position.getAllPosBack(),expected);
    });
  });
  describe('#getAllPosLeft', () => {
    it('should return all left positions of a piece', () => {
      let position=new Position('5_5');
      let expected = ['4_5','3_5','2_5','1_5','0_5'];
      assert.sameMembers(position.getAllPosLeft(),expected);
    });
  });
  describe('#getAllPosRight', () => {
    it('should return all right positions of a piece', () => {
      let position=new Position('5_5');
      assert.sameMembers(position.getAllPosRight(),['6_5','7_5','8_5','9_5']);
    });
  });
});
