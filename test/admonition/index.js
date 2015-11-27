'use strict'

var should = require('chai').should();
var fs = require('fs');
var render = require('../../');

describe('Admonition', function (){
  describe('one admonition with title', function () {
    var text = '!!! note "This is title"\n    first line\n    second line\n';
    render(text).should.be.a('String');
  });
});