let dbManager = {
  makeInsertQuery: function (tableName, attributes, values) {
    return `insert into ${tableName} (${attributes.join(",")}) values ('${values.join("','")}');`;
  },
  makeRetrieveAllQuery(tableName){
    return `select * from ${tableName};`;
  },
  makeRetrieveQueryOf(tableName,condition){
    return `select * from ${tableName} where ${condition};`;
  },
  executeQuery(client,query){
    let status = true;
    client.query(query).catch((err)=>{
      console.log(err);
      status = false;
    });
    return status;
  }
};
module.exports = dbManager;
