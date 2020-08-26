var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var os = require('os');
var ifaces = os.networkInterfaces();

const port = process.env.SERVERPORT || 3000;
const authkey = process.env.SERVERHOST;

var clients = new Array();


// Booting app
console.log('\033c'); // clear terminal
console.log('Starting Overlay Server');

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

// incoming connections
http.listen(port, function(){
  console.log('Overlay Server is ready');
  console.log('Listening on:');

  // get all ip addresses
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log('  - ' + ifname + ':' + alias, iface.address + ':' + port);
      } else {
        // this interface has only one ipv4 adress
        console.log('  - ' + ifname, iface.address + ':' + port);
      }
      ++alias;
    });
  });
});

// Authentication
io.use(function(socket, next){
    // console.log("Query: ", socket.handshake.query);
    // return the result of next() to accept the connection.
    if (socket.handshake.query.authentication == authkey) {
        return next();
    }
    // call next() with an Error if you need to reject the connection.
    next(new Error('Authentication error'));
});

// on conncection
io.on('connection', function(socket){
  console.log('Client connected');

  // add client to clientlist
  clients.push(socket);

  // return 'connected'
  socket.emit('connetion',true);

  // transfer content to all clients except self
  socket.on('content',function (data) {
    console.log(data);
    clients.forEach(function (client) {
      if(client.id != socket.id) client.emit('content',data);
    });
  });


  socket.on('disconnect', function(){
    console.log('Client disconnected');
  });

});
