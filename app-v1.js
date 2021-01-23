//Imports:
const http = require('http');
const fs = require('fs');
//vars
const PORT = 8080;

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    sendFile('./home/home.html', res);
});


server.listen(PORT, function(error) {
    if(error) {
        console.log('Error occured', error);
    } else {
        console.log('Server is up and running on localhost:', PORT);
    }
});

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