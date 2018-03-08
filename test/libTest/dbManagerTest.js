const dbManager = require('../../src/lib/dbManager');
const assert = require('chai').assert;
describe('dbManager', () => {
  describe('#makeInsertQuery', () => {
    it('should return query for insert statement', () => {
      let expected = `insert into students (id) values ('1');`;
      assert.equal(dbManager.makeInsertQuery('students',['id'],[1]),expected);
    });
  });
});