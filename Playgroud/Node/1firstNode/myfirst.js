var http = require('http');
var dt = require('./myfirstmodule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World Node.js!' + dt.myDateTime());
}).listen(8080);

console.log('This example is different!');
console.log('The result is displayed in the Command Line Interface');
