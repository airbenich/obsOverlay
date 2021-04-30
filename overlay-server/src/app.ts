/* eslint-disable no-param-reassign */
import { LowerthirdsManager } from './LowerthirdsManager';
import { ChannelManager } from './ChannelManager';

import config from './config.json';

const { Address6 } = require('ip-address');

const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const path = require('path');
const colors = require('colors/safe');
const dns = require('dns');

const port = process.env.SERVERPORT || config.port;
const host = process.env.SERVERHOST || config.host;
const authCode = process.env.AUTHKEY || config.authCode;

// Store all connected clients
const clients: any[] = [];
const lowerthirds = new LowerthirdsManager();
const channelManager = new ChannelManager();

const io = require('socket.io')(http, {
  allowEIO3: true,
  cors: {
    origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:4200', `http://${host}`, `http://${host}:${port}`],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

console.clear();
console.log(colors.green('---------- Overlay Server ----------'));
console.log('');

// serve overlay-manager
app.use(express.static(path.resolve('../overlay-manager/dist/overlay-manager/')));
app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('../overlay-manager/dist/overlay-manager/index.html'));
});

app.get('/channels/', (req: any, res: any) => {
  let channels = channelManager.getChannels();
  res.send(channels);
});

// generate channel screen 
app.get('/channels/:id/', (req: any, res: any) => {
  // WiP

  const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
  let loader = new TwingLoaderFilesystem('storage/templates/');
  let twing = new TwingEnvironment(loader, {
    'cache': false,
  });

  let template = {
    id: 1,
    name: "default",
    path: "default"
  };

  let channel = {
    id: 1,
    name: "Main",
    templateid: 1
  }

  twing.render( template.path +'/template.twig', {channel:channel, template:template, host:host, port:port, authCode:authCode}).then((output:any) => {
    res.end(output);
  });

});

// serve template static files
app.use('/templates/', express.static(path.resolve('storage/templates/')));


// Authentication
io.use((socket: any, next: any): any => {
  // console.log("Query: ", socket.handshake.query);
  // return the result of next() to accept the connection.
  if (socket.handshake.query.authentication === authCode) {
    return next();
  }
  // call next() with an Error if you need to reject the connection.
  next(new Error('Authentication error'));
});

io.on('connection', (socket: any) => {
  // Try to find which computer is connecting

  const ip = new Address6(socket.handshake.address).to4().address;
  try {
    dns.reverse(ip, (err: any, result: any) => {
      if (!result || result.size < 1) {
        console.log(colors.gray(`unknown has connected from ${ip}`));
      } else {
        console.log(colors.gray(`${result} has connected from ${ip}`));
      }
    });
  } catch (error) {
    console.log(colors.gray(`unknown has connected from ${socket.handshake.address}`));
  }

  // Add client to list
  clients.push(socket);

  // return 'connected'
  socket.emit('connection', true);

  // Send all available lowerthirds to the client
  socket.emit('get_lowerthirds', lowerthirds.getAll());

  socket.emit('get_channels', channelManager.getChannels());

  // Adds a new lowerthird
  socket.on('add_lowerthird', (data: any) => {
    console.log('Add lowerthird: ', data);

    socket.emit('add_lowerthird', lowerthirds.add(data));

    socket.broadcast.emit('get_lowerthirds', [data]);
  });

  // Updates a new lowerthird
  socket.on('update_lowerthird', (data: any) => {
    console.log('Update lowerthird: ', data);

    socket.emit('update_lowerthird', lowerthirds.update(data));

    socket.broadcast.emit('get_lowerthirds', [data]);
  });

  // removes a lowerthird
  socket.on('remove_lowerthird', (data: any) => {
    console.log('Remove lowerthird: ', data);
    lowerthirds.remove(data);

    data.deleted = true;

    clients.forEach((client) => {
      client.emit('get_lowerthirds', [data]);
    });
  });

  // Transfer content to all clients except self
  socket.on('content', (data: any) => {
    console.log('Incomming data: ', data);

    /*
    clients.forEach((client) => {
      if (client.id !== socket.id) client.emit('content', data);
    }); */

    socket.broadcast.emit('content', data);
  });
});
//
http.listen(port, () => {
  console.log(colors.brightCyan(`Listening on http://${host}:${port}`));
});
