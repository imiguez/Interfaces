const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((request, response) => {
	
    let filePath = '.' + request.url;
	filePath = filePath == './' ? './index.html' : filePath;

    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';
    let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
		if (error) {
			console.log(error.message);
			return;
		}
		response.writeHead(200, { 'Content-Type': contentType });
		response.end(content, 'utf-8');
	});

}).listen(8125);

console.log('Server running at port 8125');