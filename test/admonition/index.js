'use strict'

var should = require('chai').should();
var fs = require('fs');
var render = require('../../');

var adOpt = { admonition: true };


describe('Admonition', function (){
  describe('One admonition', function (){

    it('only work when options.admonition is true', function () {
      var text = '!!! note "This is title"\n    first line\n    second line\n';
      var out = '<p>!!! note &quot;This is title&quot;\n    first line\n    second line</p>\n';
      render(text).should.equal(out);
    });

    it('with a title', function () {
      var text = '!!! note "This is title"\n    first line\n    second line\n';
      var out = '<div class="admonition note">\n' + 
        '<p class="admonition-title">This is title</p>\n' +
        '<p>first line second line</p>\n</div>\n';
      render(text, adOpt).should.equal(out);
    });

    it('with a title - level name normalization', function () {
      var text = '!!! DanGer "This is title"\n    first line\n    second line\n';
      var out = '<div class="admonition danger">\n' + 
        '<p class="admonition-title">This is title</p>\n' +
        '<p>first line second line</p>\n</div>\n';
      render(text, adOpt).should.equal(out);
    });

    it('without a title', function () {
      var text = '!!! note\n    first line\n    second line\n';
      var out = '<div class="admonition note">\n' + 
        '<p class="admonition-title">Note</p>\n' +
        '<p>first line\n    second line</p>\n</div>\n';
      render(text, adOpt).should.equal(out);
    });

    it('proceeded paragraph', function () {
      var text = 'hello world\n\n' +
                 '!!! note "This is title"\n    first line\n    second line\n';
      var out = '<p>hello world</p>\n' +
        '<div class="admonition note">\n' + 
        '<p class="admonition-title">This is title</p>\n' +
        '<p>first line\n    second line</p>\n</div>\n';
      render(text, adOpt).should.equal(out);
    });

    it('immediately followed block level code ' +
      'should be part of admonition div', function () {
      var text = '!!! note "This is title"\n\n' + 
                 '    first line\n' + 
                 '    second line\n';
      var out = '<div class="admonition note">\n' + 
        '<p class="admonition-title">This is title</p>\n' +
        '<p>first line\nsecond line</p>\n</div>\n';
      render(text, adOpt).should.equal(out);
    });

    it('immediately followed fenced code ' +
      'should NOT be part of admonition div', function () {
      var text = '!!! note "This is title"\n' + 
                 '\n' + 
                 '```\n' + 
                 'first line\n' + 
                 'second line\n' + 
                 '```\n';
      var out = '<div class="admonition note">\n' +
        '<p class="admonition-title">This is title</p>\n' +
        '</div>\n' +
        '<pre><code>first line\nsecond line\n</code></pre>';
      render(text, adOpt).should.equal(out);
    });
  });


  describe('Multi admonitions', function () {
    it('neighbour', function () {
      var text = '!!! note "Here is a note"\n' +
                 '    1st line\n' +
                 '\n' + 
                 '!!! info "Here is a info"\n' +
                 '\n' +
                 '    1st line\n';
      var out = '<div class="admonition note">\n' +
                '<p class="admonition-title">Here is a note</p>\n' +
                '<p>1st line</p>\n' +
                '</div>\n' +
                '<div class="admonition info">\n' +
                '<p class="admonition-title">Here is a info</p>\n' +
                '<p>1st line</p>\n' +
                '</div>\n';
      render(text, adOpt).should.equal(out);
    });

    it('with paragraph between two', function () {
      var text = '!!! note "Here is a note"\n' +
                 '    1st line\n' +
                 '\n' +
                 'Here is a paragraph.\n' + 
                 '\n' +
                 '!!! info "Here is a info"\n' +
                 '\n' +
                 '    1st line\n';
      var out = '<div class="admonition note">\n' +
                '<p class="admonition-title">Here is a note</p>\n' +
                '<p>1st line</p>\n' +
                '</div>\n' +
                '<p>Here is a paragraph.</p>\n' +
                '<div class="admonition info">\n' +
                '<p class="admonition-title">Here is a info</p>\n' +
                '<p>1st line</p>\n' +
                '</div>\n';
      render(text, adOpt).should.equal(out);
    });
  });
});
