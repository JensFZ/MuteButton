var assert = require('assert'),
    http = require('http');

describe('/', function () {
    it("should return 200", function () {
        http.get('http://localhost:8080', function (res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it("should return a html page", function() {
        http.get('http://localhost:8080', function(res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                assert.notEqual(data.length, 0);
                done();
            });
        });
    });
});
