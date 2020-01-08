process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
// test
//ab -c 50 -n 500 localhost:3000/fast

// is the file being executed in master mode?
if (cluster.isMaster) {
    // cause index.js to be executed again but in child mode
    cluster.fork(); // every child has its own Thread pool
    cluster.fork();
} else {
    // this is child mode, and acts like a server and do nothing else
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
}

