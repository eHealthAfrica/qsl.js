'use strict';

var qsl = require('../lib/format');

var mockSurvey = require('./fixtures/parsed/mock-survey');
var mockInclusion = require('./fixtures/parsed/inclusion');

describe('format', function() {
  it('should override defaults in question sections', function() {
    var expected = [
      {
        label: 'Question?',
        name: 'question',
        type: 'text',
        required: false
      },
      {
        label: 'Required?',
        name: 'required',
        type: 'number',
        required: true
      }
    ];
    var actual = qsl.format(mockSurvey, 'section');
    actual.should.eql(expected);
  });

  it('should set text as an implict data type', function() {
    var doc = [
      {
        key: 'section:',
        children: [
          {
            key: 'Question?',
            children: []
          }
        ]
      }
    ];
    var expected = [
      {
        label: 'Question?',
        name: 'question',
        type: 'text'
      }
    ];
    var actual = qsl.format(doc, 'section');
    actual.should.eql(expected);
  });

  it('should respect inclusion directives', function() {
    var actual = qsl.format(mockInclusion, 'fruits');
    actual.should.be.instanceof(Array).and.have.lengthOf(4);
    actual[0].name.should.equal('like-apples');
    actual[1].name.should.equal('how-many-apples');
    actual[2].name.should.equal('name-of-apple');
    actual[3].name.should.equal('best-shop');
  });
});
