const express = require('express')

const port = process.env.MANAGERAPIPORT || 3001;

const serverport = process.env.SERVERPORT || 3000;
const serverhost = process.env.SERVERHOST || 'localhost';
const authkey = process.env.AUTHKEY;

const app = express()

// TODO persistant storage 
var overlays = []

overlays.push({
    id: 0,
    title: "test 1",
    subtitle: "testsubtitle",
    status: "active"
});
overlays.push({
    id: 0,
    title: "test 2",
    subtitle: "testsubtitle",
    status: "inactive"
});
overlays.push({
    id: 0,
    title: "test 3",
    subtitle: "testsubtitle",
    status: "inactive"
});

var displays = []

displays.push({
    id: 0,
    name: "OBS"
});

app.use(function (req, res, next) {
    console.log(Date.now(),  req.method, req.protocol, req.hostname, req.originalUrl);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// APP ROUTES
app.get('/', (req, res) => {
    res.end(JSON.stringify({ status: "ok" }));
})

// API ROUTES
app.get('/api/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

// OVERLAY API

// get overlay list
app.get('/api/overlays/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(overlays));
})

// create overlay
app.put('/api/overlay/:overlayId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

// edit overlay
app.post('/api/overlay/:overlayId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

// delete overlay
app.delete('/api/overlay/:overlayId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

// VIEW API
// get display list
app.get('/api/displays/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(displays));
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Overlay Manager listening at http://0.0.0.0:${port}`)
})