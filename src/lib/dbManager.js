let dbManager = {
  makeInsertQuery: function (tableName, attributes, values) {
    return `insert into ${tableName} (${attributes.join(",")}) values ('${values.join("','")}');`;
  },
  makeRetrieveAllQuery(tableName){
    return `select * from ${tableName};`;
  },
  makeRetrieveQueryOf(tableName,condition,attributes){
    if(attributes){
      attributes = attributes.join(',');
    }else {
      attributes='*';
    }
    let selectQuery = `select ${attributes} from step_example.${tableName}`;
    let whereClause = ` where ${condition};`;
    return selectQuery + whereClause;
  },
  executeInsertQuery(client,query){
    let status = true;
    client.query(query).catch((err)=>{
      console.log(err);
      status = false;
    });
    return status;
  },
};
module.exports = dbManager;
