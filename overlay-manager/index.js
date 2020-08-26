const express = require('express')

const port = process.env.MANAGERPORT || 3001;
const host = process.env.MANAGERHOST|| 'localhost';
const serverport = process.env.SERVERPORT || 3000;
const serverhost = process.env.SERVERHOST|| 'localhost';
const authkey = process.env.AUTHKEY;

const app = express()

app.use('/static', express.static('static'))

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    res.render('index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})