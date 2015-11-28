## hs-marked-extra

This module is kind of a extension to [chjj/marked][marked].

Currently feature:

 * admonition

Admonition in this module is a porting of [waylan's Python-Markdown admonition][waylan-md]. More infomation about that can be found [here][waylan-ad]. With CSS, admonition can make your rendered page more beautiful and expressive.

```text
!!! note "Don't forget to drink water"
    first line here.

    second line here.
```

The word "note" is considered as level, string "Don't forget to drink water" is considered as title. This will produce:

```text
<div class="admonition note">
<p class="admonition-title">Don't forget to drink water</p>
<p>first line here.</p>
<p>second line here.</p>
</div>
```

If the title is being omitted, then the level string will be the title(with 1st letter capitalized).

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

### Usage

```js
var render = require('hs-marked-extra');

var text = '!!! note\nfist line here.\n';
console.log(render(text));
```


[marked]: https://github.com/chjj/marked
[waylan-md]: https://github.com/waylan/Python-Markdown/blob/master/markdown/extensions/admonition.py
[waylan-ad]: https://pythonhosted.org/Markdown/extensions/admonition.html
