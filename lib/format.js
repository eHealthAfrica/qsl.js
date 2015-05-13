'use strict';

var slug = require('to-slug-case');

var types = require('./types');

function isInclusion(row) {
  return row.key.charAt(0) === '['
    && row.key.charAt(row.key.length - 1) === ']';
}

function getInclusion(row) {
  return row.key.slice(1, -1);
}

function knownType(row) {
  if (!row.children.length) {
    // Default to 'text' type, sans constraints
    row.children = [
      {
        key: 'text',
        children: []
      }
    ];
  }
  return row.children[0].key in types;
}

function collateEnumerations(enumeable) {
  function collate(enumerate) {
    return {
      label: enumerate.key,
      value: slug(enumerate.key)
    };
  }
  return enumeable.map(collate);
}

function appendDefaults(defaults, section) {
  // Currently, only the `required` default can be set
  // https://github.com/eHealthAfrica/qsl#the-defaults-section
  var required = defaults.children[0];
  if (!(required && required.key && required.key === 'required')) {
    return section;
  }
  section.required = true;
  return section;
}

function pluckSection(sections, section) {
  // Questionnaire sections have a colon suffix
  section += ':';
  section = sections[section];
  if (!section) {
    return {};
  }
  return section;
}

function indexByKey(qsl) {
  function byKey(accumilator, section) {
    if (!section.key) {
      return accumilator;
    }
    accumilator[section.key] = section;
    return accumilator;
  }
  return qsl.reduce(byKey, {});
}

function parseSection(index, section) {
  section = pluckSection(index, section);
  if (index.defaults) {
    section = appendDefaults(index.defaults, section);
  }

  if (!(section && section.children)) {
    return [];
  }

  var elements = [];

  function pushInclusion(inclusion) {
    elements.push(inclusion);
  }

  function createElement(row) {
    if (isInclusion(row)) {
      var inclusion = getInclusion(row);
      var inclusions = parseSection(index, inclusion);
      inclusions.forEach(pushInclusion);
      return;
    }

    var element = {
      label: row.key,
      name: slug(row.key)
    };

    var key = row.children[0].key;
    var map = types[key];

    element.type = map.type;
    if (map.options) {
      element.fields = map.options;
    }

    if (section.required) {
      element.required = true;
    }

    var children = row.children[0].children;
    if (!children.length) {
      elements.push(element);
      return;
    }

    if (key === 'enumeration') {
      element.fields = collateEnumerations(children);
    }

    if (children[0].key && children[0].key === 'optional') {
      element.required = false;
    }

    elements.push(element);
  }

  section.children
    .filter(knownType)
    .forEach(createElement);

  return elements;
}

exports.format = function(qsl, section) {
  var index = indexByKey(qsl);
  return parseSection(index, section);
};
