const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('HTTP', Date.now() - start);
        });
    }).end();
}

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
// result:
// HTTP 232
// Hash: 1434
// FS: 1435
// Hash: 1445
// Hash: 1484
// Hash: 1600

/*
* Why?
* The thread assigned FS work initiates the work, asking for file stastics, and gets back to Thread pool.
* The thread gets another task, and a thread will be assign the left task for FS.
* */

