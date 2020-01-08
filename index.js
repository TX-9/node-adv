// test
//ab -c 50 -n 500 localhost:3000/fast


const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('Hi there');
    });
});

app.get('/faster', (req, res) => {
    res.send('faster');
});

app.listen(3000);

//pm2 start index.js -i 0
//0: pm2 decides number of instance
//pm2 show 0
//pm2 monitor
//pm2 delete index
//pm2 list
