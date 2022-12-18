var lowerThird = new LowerThird({});

// socket.io
client = io.connect('http://'+CONFIG.host+':'+CONFIG.port,{
  query: "authentication=" + CONFIG.authkey
});

// on connection
client.on('connect',function() {
  console.log('Successfully connected to http://'+CONFIG.host+':'+CONFIG.port);
});

// on disconnect
client.on('disconnect', function(){
    console.log('Lost connection to http://'+CONFIG.host+':'+CONFIG.port);
});

// recieve content from server
client.on('content',function(data) {
  console.log('Recieved data from Server:');
  console.log(data);
  

//   client.emit('content',{
//     'type':'lowerThird',
//     'content': {
//         action:'show',
//         element:lowerThird
//     },
// });

  if(data.type == 'lowerThird') {
    if(data.content.action == 'show') {
      lowerThird.title = data.content.element.title;
      lowerThird.subtitle = data.content.element.subtitle;
      lowerThird.show();
    }
    if(data.content.action == 'hide') {
      lowerThird.hide();
      
    }
  }
  if(data.type == 'productionTimer') {
    // console.log(new Date(data.content.initialTime));
    $('#timeLeft').html(new Date(data.content.currentTime).toLocaleTimeString().split(' ')[0]);
    $('#timeRunning').html(new Date(data.content.runningTime).toLocaleTimeString().split(' ')[0]);
  }
});