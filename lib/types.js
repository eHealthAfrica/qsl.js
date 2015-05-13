'use strict';

/**
 * Maps QSL data types with templates containing appropriate HTML form elements.
 */
module.exports = {
  text: {
    type: 'text'
  },
  integer: {
    type: 'number',
    step: 1,
    min: 0
  },
  real: {
    type: 'number'
  },
  date: {
    type: 'date'
  },
  time: {
    type: 'time'
  },
  datetime: {
    type: 'datetime'
  },
  gps: {
    type: 'number'
  },
  enumeration: {
    type: 'radio',
    options: []
  },
  'yes/no': {
    type: 'yes/no',
    options: [
      {
        label: 'Yes',
        value: 'Y'
      },
      {
        label: 'No',
        value: 'N'
      }
    ]
  },
  gender: {
    type: 'gender',
    options: [
      {
        label: 'Male',
        value: 'M'
      },
      {
        label: 'Female',
        value: 'F'
      }
    ]
  }
};
