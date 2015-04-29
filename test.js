/*!
 * init-file-loader <https://github.com/jonschlinkert/init-file-loader>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var loader = require('./');

describe('loader', function () {
  it('should add an id property to the object:', function () {
    var file = {path: 'a/b/c.md', contents: new Buffer('b')};
    loader(file).should.have.property('c');
    loader(file).c.should.have.property('id', 'c');
  });

  it('should add a content property to the object:', function () {
    var file = {path: 'a/b/c.md', contents: new Buffer('b')};
    loader(file).should.have.property('c');
    loader(file).c.should.have.property('content', 'b');
  });

  it('should use a custom renameKey function:', function () {
    var file = {path: 'a/b/c.md', contents: new Buffer('b')};
    function renameKey(fp) {
      return fp;
    }
    loader(file, renameKey).should.have.property('a/b/c.md');
    loader(file, renameKey)['a/b/c.md'].should.have.property('content', 'b');
  });

  it('should convert the object to a template object:', function () {
    var file = {path: 'a', contents: new Buffer('b')};
    loader(file).should.eql({a: {id: 'a', path: 'a', content: 'b', contents: new Buffer('b')}});
  });

  it('should throw an error when `file` is not an object:', function () {
    (function () {
      loader();
    }).should.throw('init-file-loader expects file to be an object.');

    (function () {
      loader('foo');
    }).should.throw('init-file-loader expects file to be an object.');
  });

  it('should throw an error when `path` is missing:', function () {
    (function () {
      loader({contents: 'foo'});
    }).should.throw('init-file-loader expects `file` to have a `path` property.');
  });

  it('should throw an error when `content` is missing:', function () {
    (function () {
      loader({path: 'foo'});
    }).should.throw('init-file-loader expects `file` to have a `contents` property.');
  });
});
