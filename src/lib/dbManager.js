let dbManager = {};
dbManager = {
  makeInsertQuery: function (tableName, attributes, values) {
    return `insert into ${tableName} (${attributes.join(",")}) values ('${values.join("','")}');`;
  },
};
module.exports = dbManager;