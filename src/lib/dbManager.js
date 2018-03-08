let dbManager = {};
dbManager = {
  makeInsertQuery: function (tableName, attributes, values) {
    return `insert into ${tableName} (${attributes.join(",")}) values ('${values.join("','")}');`;
  },
  makeRetrieveAllQuery(tableName){
    return `select * from ${tableName};`;
  },
  makeRetrieveQueryOf(tableName,condition){
    return `select * from ${tableName} where ${condition};`;
  }
};
module.exports = dbManager;