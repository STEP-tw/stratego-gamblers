const assert = require('chai').assert;
const Scout = require('../../src/models/scout.js');


describe('Scout', () => {
  let scout;

  beforeEach(()=>{
    scout = new Scout();
  })
  it('should return instance of Scout', () => {
    let expected = {
      id: '2',
      name: 'Scout',
      rank: 2
    };
    let actual = scout;
    assert.deepEqual(expected, actual);
  });
  it('should give potential moves for scout', () => {
    let posMap = {myArmy:['3_3','1_8'],opponentArmy:['7_8'],lakeArea:[]};
    let actual = scout.getPotentialMoves('3_8',posMap);
    let expected = {
      freeMoves: [ '2_8', '4_8', '5_8', '6_8', '3_9', '3_7', '3_6', '3_5', '3_4'],
      attackMoves: ['7_8']
    };
    assert.deepEqual(actual, expected);
  });
});
