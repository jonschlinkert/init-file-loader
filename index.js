/*!
 * init-file-loader <https://github.com/jonschlinkert/init-file-loader>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');

module.exports = function fileLoader(file, renameKey) {
  if (!file || typeof file !== 'object') {
    throw new TypeError('init-file-loader expects file to be an object.');
  }

  if (!file.hasOwnProperty('path')) {
    throw new TypeError('init-file-loader expects `file` to have a `path` property.');
  }

  if (!file.hasOwnProperty('contents')) {
    throw new TypeError('init-file-loader expects `file` to have a `contents` property.');
  }

  var name = typeof renameKey !== 'function'
    ? path.basename(file.path, path.extname(file.path))
    : renameKey(file.path);

  file.content = file.contents.toString();
  file.id = name;
  var template = {};
  template[name] = file;
  return template;
};
