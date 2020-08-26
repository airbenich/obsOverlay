const express = require('express')

const port = process.env.MANAGERPORT || 3001;

const serverport = process.env.SERVERPORT || 3000;
const serverhost = process.env.SERVERHOST|| 'localhost';
const authkey = process.env.AUTHKEY;

const app = express()

app.use('/static', express.static('static'))

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// TODO persistant storage 
var overlays = []

overlays.push ({ 
    id: 0,
    name: "test",
    subtitle: "testsubtitle"
});

var displays = []

displays.push ({ 
    id: 0,
    name: "OBS"
});

// APP ROUTES
app.get('/', (req, res) => {
    res.render('index.html');
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
app.get('/api/displays/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(displays));
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://0.0.0.0:${port}`)
})