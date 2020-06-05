'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const fileType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.png': 'image/png'
};

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 302; 
        res.setHeader('Location', '/war-at-sea');
        res.end();
        return;
    }

    let page = req.url;
    let pathname;
    let ext = path.extname(req.url);

    if (req.url === '/war-at-sea') {
        page = '/index.html';
        ext = '.html';
    }

    if (fileType[ext] === 'text/html') {
        pathname = path.join(__dirname,  page);
    } else if (fileType[ext] === 'text/css') {
        pathname = path.join(__dirname,  page);
    } else if (fileType[ext] === 'text/javascript') {
        pathname = path.join(__dirname,  page);
    }

    const info = {
        Type: ext,
        Path: pathname
    };
    console.dir(info);

    fs.exists(pathname, exist => {
        if (!exist) {
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                res.setHeader('Content-type', fileType[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Starting on ${hostname}:${port}`);
});