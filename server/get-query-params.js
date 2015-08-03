var querystring = require('querystring');

module.exports = function (url) {
    var pos = url.indexOf('?');
    if (pos < 0) { return {}; }

    return querystring.parse(url.substr(pos+1));
};
