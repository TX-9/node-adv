const cluster = require('cluster');

// is the file being executed in master mode?
if (cluster.isMaster) {
    // cause index.js to be executed again but in child mode
    cluster.fork();
} else {
    // this is child mode, and acts like a server and do nothing else
    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while(Date.now() - start <= duration) {}
    }

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi there');
    });
    app.get('/faster', (req, res) => {
        res.send('faster');
    });

    app.listen(3000);
}

