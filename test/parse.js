'use strict';

var fs = require('fs');
var qsl = require('../lib/parse');

describe('parse', function() {
  describe('fixtures', function() {
    var bands;
    before(function(done) {
      fs.readFile('test/fixtures/bands.qsl', 'utf-8', function(err, data) {
        if (err) {
          throw err;
        }
        bands = data;
        done();
      });
    });
    it('should parse the bands fixture', function() {
      var parsed = qsl.parse(bands);
      parsed.should.be.instanceof(Array).and.have.lengthOf(4);
    });
  });
});
