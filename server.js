const http = require('http');
const getReqestHandler = require('./src/routing');
const PORT = process.env.PORT || 8230;
const pg = require('pg');
let connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/postgres";
console.log(connectionString);
const client = new pg.Client(connectionString);
client.connect().then(()=>{
  const requestHandler = getReqestHandler(client);
  let server = http.createServer(requestHandler);
  server.listen(PORT);
  console.log(`listening at ${PORT}`);
}).catch(err=>console.log(err));
