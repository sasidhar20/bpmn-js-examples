'use strict';

// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
var fs = require('fs');

var Comments = require('./comments');


// inlined in result file via brfs
var pizzaDiagram = fs.readFileSync(__dirname + '/../resources/pizza-collaboration.bpmn', 'utf-8');


// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var BpmnViewer = require('bpmn-js');


var viewer = new BpmnViewer({ container: '#canvas' });


viewer.importXML(pizzaDiagram, function(err) {

  if (!err) {
    viewer.get('canvas').zoom('fit-viewport');

    var container = document.getElementById('comments-container');

    new Comments(container);

  } else {
    console.log('something went wrong:', err);
  }
});