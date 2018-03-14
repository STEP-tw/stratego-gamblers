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
    let selectQuery = `select ${attributes} from ${tableName}`;
    let whereClause = ` where ${condition};`;
    return selectQuery + whereClause;
  },
  executeQuery(client,query,resolver,rejected){
    client.query(query).then((resp)=>{
      resolver(resp);
    }).catch((err)=>{
      rejected(err);
    });
  }
};
module.exports = dbManager;
