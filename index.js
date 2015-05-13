'use strict';

var parser = require('./lib/parse');
var formatter = require('./lib/format');

exports.parse = function(rawQSL, section) {
  var qsl = parser.parse(rawQSL);
  return formatter.format(qsl, section);
};
