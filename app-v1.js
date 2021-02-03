//Imports:
const http = require('http');
const fs = require('fs');
//vars
const PORT = 8080;

/**
 * webserver wrapper
 */
const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome</h1>');
    var headers = req.rawHeaders;
    var headersHtml = htmlHeadersListAsString(headers);
    res.write(headersHtml);
    res.end();
});

/**
 * enables server to listen to a port
 */
server.listen(PORT, function(error) {
    if(error) {
        console.log('Error occured', error);
    } else {
        console.log('Server is up and running on localhost:', PORT);
    }
});

/**
 * input a raw array of strings (headers) and wrap with <ul><li> html
 * @param {StringArray} headers 
 */
function htmlHeadersListAsString(headers) {
    var buf = '<ul>';
    var end = '</ul>';
    for (i = 0; i<headers.length-1 ; i+=2) {
        buf += '<li>';
        buf += headers[i]+': '+headers[i+1];
        buf += '</li>';
    }
    return buf+end;
}

/**
 * read a file and write it to (response) object ex. index.html file
 * @param {path to file} url 
 * @param {response/request} object 
 */
function sendFile(url, object) {
    fs.readFile(url, function(error, data) {
        if(error) {
            object.writeHead(404);
            object.write('Error: file not found');
        } else {
            object.write(data);
        }
        object.end();
    });
}