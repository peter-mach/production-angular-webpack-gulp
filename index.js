var http = require('http');
var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });
var port = process.env.PORT || 8000;

http.createServer(function (req, res) {
    if (req.url.indexOf('/kitty') === 0) {
        return require('./server/http-handle-kittens')(req, res);
    }

    // default: handle the request as a static file
    serveStaticFiles(req, res);
}).listen(port);

console.log('Listening on http://localhost:%d', port);
