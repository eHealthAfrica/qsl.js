'use strict';

module.exports = [
  {
    key: 'Mock survey',
    children: []
  },
  {
    key: 'defaults',
    children: [
      {
        key: 'required',
        children: []
      }
    ]
  },
  {
    key: 'section:',
    children: [
      {
        key: 'Question?',
        children: [
          {
            key: 'text',
            children: [
              {
                key: 'optional',
                children: []
              }
            ]
          }
        ]
      },
      {
        key: 'Required?',
        children: [
          {
            key: 'integer',
            children: []
          }
        ]
      }
    ]
  }
];
