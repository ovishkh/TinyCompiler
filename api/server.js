const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const apiHandler = require('./compiler');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Mock Express-like methods for the API handler
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return res;
    };
    res.setHeader = (key, value) => {
        // Standard http.setHeader
        Object.getPrototypeOf(res).setHeader.call(res, key, value);
    };

    // Add parsed query/body to req
    req.query = parsedUrl.query;

    // API Route
    if (pathname === '/api/compiler') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    req.body = JSON.parse(body);
                } catch (e) {
                    req.body = {};
                }
                apiHandler(req, res);
            });
        } else {
            apiHandler(req, res);
        }
        return;
    }

    // Static File Serving
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    } else if (filePath.startsWith('./api/')) {
        // Prevent access to api source files
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`API endpoint available at http://localhost:${PORT}/api/compiler`);
});
