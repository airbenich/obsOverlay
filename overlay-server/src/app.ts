import { LowerthirdsManager } from './LowerthirdsManager';
import config from './config.json';

const app = require('express')();
const http = require('http').Server(app);

const port = process.env.SERVERPORT || config.port;
const host = process.env.SERVERHOST || config.host;
const authCode = process.env.AUTHKEY || config.authCode;

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

app.get('/', (req: any, res: any) => {
  res.sendFile(`${__dirname}/index.html`);
});

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

// Store all connected clients
const clients: any[] = [];
const lowerthirds = new LowerthirdsManager();

io.on('connection', (socket: any) => {
  console.log('Client connected');

  // Add client to list
  clients.push(socket);

  // return 'connected'
  socket.emit('connetion', true);

  // Send all available lowerthirds to the client
  console.log('Send all available lowerthirds to a client');
  socket.emit('get_lowerthirds', lowerthirds.getAll());

  //
  socket.on('add_lowerthird', (data: any) => {
    console.log('Add lowerthird: ', data);
    lowerthirds.add(data);
    io.emit('get_lowerthirds', lowerthirds.getAll());
  });

  socket.on('update_lowerthird', (data: any) => {
    console.log('Update lowerthird: ', data);
    lowerthirds.update(data);
    io.emit('get_lowerthirds', lowerthirds.getAll());
  });

  socket.on('remove_lowerthird', (data: any) => {
    console.log('Remove lowerthird: ', data);
    lowerthirds.remove(data);
    io.emit('get_lowerthirds', lowerthirds.getAll());
  });

  // Transfer content to all clients except self
  socket.on('content', (data: any) => {
    console.log('Incomming data: ', data);

    clients.forEach((client) => {
      if (client.id !== socket.id) client.emit('content', data);
    });
  });
});

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
