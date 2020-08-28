const express = require('express')
var bodyParser = require('body-parser');

const port = process.env.MANAGERAPIPORT || 3001;

const serverport = process.env.SERVERPORT || 3000;
const serverhost = process.env.SERVERHOST || 'localhost';
const authkey = process.env.AUTHKEY;

const app = express()
app.use(bodyParser.json());

// TODO persistant storage 
var overlays = []

overlays.push({
    id: 0,
    title: "test 1",
    subtitle: "testsubtitle",
    design: "default",
    status: "active"
});
overlays.push({
    id: 1,
    title: "test 2",
    subtitle: "testsubtitle",
    design: "default",
    status: "inactive"
});
overlays.push({
    id: 2,
    title: "test 3",
    subtitle: "testsubtitle",
    design: "default",
    status: "inactive"
});

var displays = []

displays.push({
    id: 0,
    name: "OBS"
});

app.use(function (req, res, next) {
    console.log(Date.now(), req.method, req.protocol, req.hostname, req.originalUrl, req.params);
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
    // MOCK
    var status = [{ 
        serverstatus: "disconnected"
    }];
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(status));
})

// OVERLAY API

// get overlay list
app.get('/api/overlays/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(overlays));
})

// edit overlay
app.put('/api/overlays/:overlayid', (req, res) => {
    // TODO SAVE TO DB
    var newOverlay = req.body;
    overlays.forEach(function (overlay, index) {
        if (overlay.id == newOverlay.id) {
            overlays[index] = newOverlay;
        }
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

// create overlay
app.post('/api/overlays/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

// delete overlay
app.delete('/api/overlays/:overlayId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

// VIEW API
// get display list
app.get('/api/displays/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(displays));
})

// send overlay on display
// edit overlay
app.put('/api/displays/show/', (req, res) => {
    // TODO SAVE TO DB
    var newOverlay = req.body;
    overlays.forEach(function (overlay, index) {
        if (overlay.id == newOverlay.id) {
            overlays[index] = newOverlay;
        }
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "ok" }));
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Overlay Manager listening at http://0.0.0.0:${port}`)
})