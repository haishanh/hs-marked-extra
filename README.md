## hs-marked-extra

This module is kind of a extension to [chjj/marked][marked].

Currently feature:

 * admonition

Admonition in this module is a porting of [waylan's Python-Markdown admonition][waylan-md]. More infomation about that can be found [here][waylan-ad]. With CSS, admonition can make your rendered page more beautiful and expressive.

For example text below:

```text
!!! note "Don't forget to drink water"
    first line here.

    second line here.
```

will produce:

```text
<div class="admonition note">
<p class="admonition-title">Don't forget to drink water</p>
<p>first line here.</p>
<p>second line here.</p>
</div>
```

In the above example, the word "note" is considered as level, the string "Don't forget to drink water" is considered as title.

If the title is being omitted, then the level string will be the title(with 1st letter capitalized). So

```text
!!! danger
    first line here.
```

will produce:

```text
<div class="admonition danger">
<p class="admonition-title">Danger</p>
<p>first line here.</p>
</div>
```

### Install

```text
npm install hs-marked-extra --save
```

### Usage

```js
var md = require('hs-marked-extra');

var text = '!!! note "Tile"\n    fist line here.\n';
console.log(md(text, { admonition: true }));
```

And the API is same with original [marked API][marked-api].

```js
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  admonition: true
});

console.log(marked('!!! note "Tile"\n    fist line here.\n'));
```

**Note:** option `admonition` is false by default, and it doesn't compatable with option `sanitize`.

### License

MIT

[marked]: https://github.com/chjj/marked
[waylan-md]: https://github.com/waylan/Python-Markdown/blob/master/markdown/extensions/admonition.py
[waylan-ad]: https://pythonhosted.org/Markdown/extensions/admonition.html
[marked-api]: https://github.com/chjj/marked#markedmarkdownstring-options-callback
