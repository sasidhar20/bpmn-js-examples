'use strict';

var h = require('./h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var FakeDB = require('./FakeDB');

function Comments(container) {
  this.fakeDB = new FakeDB();

  var data = { comments: this.fakeDB.get() };

  this.tree = this._render(data);
  this.rootNode = createElement(this.tree);

  container.appendChild(this.rootNode);
}

module.exports = Comments;


Comments.prototype.add = function(event) {
  var textField = event.target.closest('div').querySelector('#text');

  this.fakeDB.add(textField.value);

  textField.value = '';

  this._update();
};


Comments.prototype.delete = function(event) {
  var id = event.target.parentNode.querySelector('span').id;

  this.fakeDB.delete(id);

  this._update();
};


Comments.prototype.edit = function(event) {
  var id = event.target.parentNode.querySelector('span').id;
  var textbox = document.getElementById('text');
  var comment = this.fakeDB.get(id);

  textbox.value = comment;

  this.currentEdit = id;
};


Comments.prototype.update = function(event) {
  var id = this.currentEdit;
  var textbox = document.getElementById('text');

  this.fakeDB.update(id, textbox.value);
  this.currentEdit = undefined;

  textbox.value = '';

  this._update();
};


Comments.prototype._update = function() {
  var comments = this.fakeDB.get();

  var newTree = this._render({ comments: comments });
  var patches = diff(this.tree, newTree);

  this.rootNode = patch(this.rootNode, patches);
  this.tree = newTree;
};


Comments.prototype._render = function(data) {
  console.log('VirtualDOM:render');
  var stuff = (
    <div>
      <ul style="-webkit-padding-start:0px">
        {Object.keys(data.comments).map(idx => {
          return (
            <li style="padding: 5px; list-style-type: none;">
              <span class="content" id={idx} style="padding: 5px;">{data.comments[idx]}</span>
              <button onclick={this.delete.bind(this)}>Delete</button>
              <button onclick={this.edit.bind(this)}>Edit</button>
            </li>
          );
        })}
      </ul>
      <p><textarea id="text"></textarea></p>
      <p>
        <button id="add" onclick={this.add.bind(this)}>Add</button>
        <button id="update" onclick={this.update.bind(this)}>Update</button>
      </p>
    </div>
  );
  return stuff;
};