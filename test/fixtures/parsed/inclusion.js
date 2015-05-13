'use strict';

module.exports = [
  {
    key: 'apples:',
    children: [
      {
        key: 'How many apples?',
        children: [
          {
            key: 'integer',
            children: []
          }
        ]
      },
      {
        key: 'Name of apple',
        children: []
      }
    ]
  },
  {
    key: 'fruits:',
    children: [
      {
        key: 'Like apples?',
        children: [
          {
            key: 'yes/no',
            children: []
          }
        ]
      },
      {
        key: '[apples]',
        children: []
      },
      {
        key: 'Best shop?',
        children: [
          {
            key: 'gps',
            children: []
          }
        ]
      }
    ]
  }
];
