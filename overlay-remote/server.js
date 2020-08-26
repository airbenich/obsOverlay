var CONFIG = {};
CONFIG.host = process.env.HOST || 'localhost';
CONFIG.port = process.env.PORT || 3000;
CONFIG.authkey = process.env.AUTHKEY;

// Booting app
console.log('\033c'); // clear terminal
console.clear();
console.log('Starting Overlay Remote');

var inquirer = require('inquirer');
var LowerThird = require('./class/LowerThird');


// socket.io
var io = require('socket.io-client');
client = io.connect('http://'+CONFIG.host+':'+CONFIG.port,{
  query: "authentication="+CONFIG.authkey
});

var LowerThirdController = require('./class/LowerThirdController');
var lowerThirdController = new LowerThirdController();

// default data when not data is available
lowerThirdController.add(new LowerThird({
  name: 'Max Mustertechniker',
  description: 'Techniker',
}));

// menu
var Menu = require('./class/Menu');
var menu = new Menu();
menu.lowerThirdController = lowerThirdController;

// on connection
client.on('connect',function() {
  console.log('Successfully connected to http://'+CONFIG.host+':'+CONFIG.port);

  // start menu
  menu.client = client;
  menu.mainmenu();
});

// on disconnect
client.on('disconnect', function(){
    console.log('Lost connection to http://'+CONFIG.host+':'+CONFIG.port);
});

// recieve content from server
client.on('content',function(data) {
});

// add clear method
console.reset = function () {
  return process.stdout.write('\033c');
}