'use strict';

var fs = require('fs');
var marked = require('marked');
var Renderer = marked.Renderer;


var renderCode = Renderer.prototype.code;


//var reAdmonition = /(?:^|\n)!!!\ ?([\w\-]+)(?:\ "(.*?)")?/;
var reAdmonition = /(?:^|\n)!!!\ ?([\w\-]+)(?:\ "(.*?)")?(?:\s?\n\s+(\w+[\s\S]*)?)?/;
var opened = 0;
var magic = '%M@|g-i#+.c';


Renderer.prototype.code = function (code, lan) {
  let mat = reAdmonition.exec(code);
  if(mat) {
    let out = '';
    let level = mat[1];
    let title = mat[2];
    let para = mat[3];
    out += '<div class="admonition ' + level.toLowerCase() +
      '"><p class="admonition-title">';
    if (title) {
      out += title + '</p>';
    } else {
      out += level[0].toUpperCase() + level.slice(1).toLowerCase() + '</p>';
    }
    if (para) {
      out += '<p>' + para + '</p>';
    }
    return out;
  }

  if (opened > 0 && code === magic) {
    opened--;
    return '</div>';
  }
  return renderCode.call(this, code, lan);
}

function render(text, options) {
  var tokens = marked.lexer(text, options);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    //console.log( '[' + i + '] ' + token.type + ' : ' + token.text);
    if (token.type === 'paragraph') {
      if(reAdmonition.test(token.text)) {
        token.type = 'code'; //dirty one
        var toInsert = { type: 'code', text: magic};
        if (i < tokens.length - 1) {
          if (tokens[i+1].type !== 'code' || 'lang' in tokens[i+1]) tokens.splice(i+1, 0, toInsert);
          else {
            tokens[i+1].type = 'paragraph'; //dirty two
            tokens.splice(i+2, 0, toInsert);
          }
        } else {
          // the last one
          tokens.push(toInsert);
        }
        opened++;
      }
    }
  }
  return marked.parser(tokens);
};


module.exports = render;
