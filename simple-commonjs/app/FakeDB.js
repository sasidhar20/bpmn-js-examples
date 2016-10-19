'use strict';

function FakeDB() {
  this.nextId = 3;
  this.comments = { 0: 'foo', 1: 'bar', 2: 'baz' };
}

module.exports = FakeDB;

FakeDB.prototype.get = function(id) {
  console.log('FakeDB:get');

  if (id === undefined) {
    return this.comments;
  } else {
    return this.comments[id];
  }
};

FakeDB.prototype.add = function(comment) {
  console.log('FakeDB:add');
  this.comments[this.nextId] = comment;
  return this.nextId++;
};

FakeDB.prototype.delete = function(id) {
  console.log('FakeDB:delete');
  delete this.comments[id];
};

FakeDB.prototype.update = function(id, comment) {
  console.log('FakeDB:update');
  this.comments[parseInt(id)] = comment;
};