
var assert = require('assert');
var getDocument = require('../');

describe('get-document', function () {

  it('should work with a Window object', function () {
    var doc = getDocument(window);
    assert(doc === document);
  });

  it('should work with a Document object', function () {
    var doc = getDocument(document);
    assert(doc === document);
  });

  it('should work with a <body> element', function () {
    var doc = getDocument(document.body);
    assert(doc === document);
  });

  it('should work with a node inside the DOM', function () {
    var doc = getDocument(document.body.firstChild);
    assert(doc === document);
  });

  it('should work with a new DOM element', function () {
    var doc = getDocument(document.createElement('div'));
    assert(doc === document);
  });

  it('should work with a TextNode instance', function () {
    var doc = getDocument(document.createTextNode(''));
    assert(doc === document);
  });

  it('should work with a Range instance', function () {
    var doc = getDocument(document.createRange());
    assert(doc === document);
  });

  it('should work with a Selection instance', function () {
    var sel = window.getSelection();

    // NOTE: a Selection needs to have some kind of selection on it
    // (i.e. not `type: "None"`) in order for a Document to be found
    var range = document.createRange();
    range.selectNode(document.body);
    sel.removeAllRanges();
    sel.addRange(range);

    var doc = getDocument(sel);
    assert(doc === document);

    // clean up
    sel.removeAllRanges();
  });

});
