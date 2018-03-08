const dbManager = require('../../src/lib/dbManager');
const assert = require('chai').assert;
describe('dbManager', () => {
  describe('#makeInsertQuery', () => {
    it('should return query for insert statement', () => {
      let expected = `insert into students (id) values ('1');`;
      assert.equal(dbManager.makeInsertQuery('students',['id'],[1]),expected);
    });
  });
  describe('#makeRetrieveAllQuery', () => {
    it('should return query for select all statement', () => {
      let expected='select * from students;';
      assert.equal(dbManager.makeRetrieveAllQuery('students'),expected);
    });
  });
  describe('#makeRetrieveQueryOf', () => {
    it('should give retrieve query for given condition', () => {
      let expected = 'select * from students where name="sayima";';
      assert.equal(dbManager.makeRetrieveQueryOf('students','name="sayima"'),expected);
    });
  });
});