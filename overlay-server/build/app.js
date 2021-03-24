"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LowerthirdsManager_1 = require("./LowerthirdsManager");
const config_json_1 = __importDefault(require("./config.json"));
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
// Authentication
io.use((socket, next) => {
    // console.log("Query: ", socket.handshake.query);
    // return the result of next() to accept the connection.
    if (socket.handshake.query.authentication === config_json_1.default.authCode) {
        return next();
    }
    // call next() with an Error if you need to reject the connection.
    next(new Error('Authentication error'));
});
// Store all connected clients
const clients = [];
const lowerthirds = new LowerthirdsManager_1.LowerthirdsManager();
io.on('connection', (socket) => {
    console.log('Client connected');
    // Add client to list
    clients.push(socket);
    // return 'connected'
    socket.emit('connetion', true);
    // Send all available lowerthirds to the client
    console.log('Send all available lowerthirds to a client');
    socket.emit('get_lowerthirds', lowerthirds.getAll());
    //
    socket.on('add_lowerthird', (data) => {
        console.log('Add lowerthird: ', data);
        lowerthirds.add(data);
        io.emit('get_lowerthirds', lowerthirds.getAll());
    });
    socket.on('update_lowerthird', (data) => {
        console.log('Update lowerthird: ', data);
        lowerthirds.update(data);
        io.emit('get_lowerthirds', lowerthirds.getAll());
    });
    socket.on('remove_lowerthird', (data) => {
        console.log('Remove lowerthird: ', data);
        lowerthirds.remove(data);
        io.emit('get_lowerthirds', lowerthirds.getAll());
    });
    // Transfer content to all clients except self
    socket.on('content', (data) => {
        console.log('Incomming data: ', data);
        clients.forEach((client) => {
            if (client.id !== socket.id)
                client.emit('content', data);
        });
    });
});
http.listen(config_json_1.default.port, () => {
    console.log(`listening on http://localhost:${config_json_1.default.port}`);
});
