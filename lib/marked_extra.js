var marked = require('marked');

var reAd = /(^|\n)!!! ([\w\-]+)(?: "([^\n]*?)")?(?:\s*\n|\s*$)((?:(?:\t| {4})(?:[^\n]+)(?:\n|$)|\s*(\n|$))*)?/

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function merge(obj) {
  var i = 1, target, key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function markedEx (src, opt, callback) {
  var options = merge({}, opt);
  if (options.sanitize !== true && options.admonition === true) {
    var cap,
        level,
        title,
        para,
        out = '';
    src = src.replace(/\r\n|\r/g, '\n');
    while (cap = reAd.exec(src)) {
      level = cap[2];
      title = cap[3];
      para = cap[4];
      out += cap[1] +
        '<div class="admonition ' + level.toLowerCase() + '">\n' +
        '<p class="admonition-title">';
      if (title) {
        out += title + '</p>\n';
      } else {
        out += level[0].toUpperCase() + level.slice(1).toLowerCase() + '</p>\n';
      }
      if (para) {
        var paras = para.split(/\n(?: *|)\n/);
        for (var i = 0; i < paras.length; i++) {
          if (!paras[i]) continue;
          var str = escape(paras[i]
              .replace(/^(\t| {4})/, '')
              .replace(/\n(?:\t| {4})/, ' ')
              .replace(/\s*\n$/,'')
              .replace(/\n/, ' '), true);
          out += '<p>' + str + '</p>\n';
        }
      }
      out += '</div>\n'; // extra newline
      src = src.replace(cap[0], out);
    }
    if (Object.keys(options).length === 1) {
      // user only supplied admonition in options
      // remove it for marked to use default options
      return marked(src, callback);
    } else {
      delete opt.admonition;
      return marked(src, opt, callback);
    }
  }
  //
  return marked(src, opt, callback);
}

// expose
markedEx.Parser = marked.Parser;
markedEx.parser = marked.parse;

markedEx.Renderer = marked.Renderer;

markedEx.Lexer = marked.Lexer;
markedEx.lexer = marked.Lexer.lex;

markedEx.InlineLexer = marked.InlineLexer;
markedEx.inlineLexer = marked.inlineLexer;

markedEx.parse = markedEx;

module.exports = markedEx;
