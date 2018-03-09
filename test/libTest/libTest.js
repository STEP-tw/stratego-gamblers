const assert = require('chai').assert;
const lib = require('../../src/lib/lib.js');

describe('#getInsertQuery',()=>{
  it('should generate insert query for given game setup',()=>{
    let expected = 'insert into setups (mode,name,setup) values (\'quick\',\'sample\',\'{"1":"B"}\');';
    assert.equal(lib.getInsertQuery({1:"B",setupName:'sample'},'quick'),expected);
  });
});
