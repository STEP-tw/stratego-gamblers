const http = require('http');
const PORT = process.env.PORT || 8230;
const app = require('./app.js');

let server = http.createServer(app);
server.listen(PORT);
console.log(`listening at ${PORT}`);
