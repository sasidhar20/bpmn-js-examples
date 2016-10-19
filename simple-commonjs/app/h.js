'use strict';

var h = require('virtual-dom/h');

var isObject = require('lodash/lang').isObject,
    isString = require('lodash/lang').isString,
    isFunction = require('lodash/lang').isFunction;


module.exports = function() {

  var args = Array.prototype.slice.call(arguments),
      element = args.shift(),
      options = args.shift() || {},
      children = args;

  if (isString(element)) {
    return h(element, options, children);
  }

  if (isFunction(element)) {
    // assume constructor
    return new element(options, children).render();
  }

  if (isObject(element)) {
    // assume element is already a VNode, Widget or Thunk
    if (isFunction(element.render)) {
      return element.render();
    }

    return element;
  }
};
