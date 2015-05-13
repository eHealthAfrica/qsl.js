'use strict';

var fs = require('fs');
var qsl = require('..');

describe('qsl', function() {
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

  it('should parse and return a formatted document', function() {
    var expected = [
      {
        label: 'First gig?',
        name: 'first-gig',
        type: 'text',
        required: true
      },
      {
        label: 'How many gigs?',
        name: 'how-many-gigs',
        type: 'number',
        required: true
      }
    ];
    var actual = qsl.parse(bands, 'bands');
    actual.should.eql(expected);
  });
});
