# Installation

1. Import NjDesktop and it's main SCSS file.
2. In your markup, have an element with an arbitrary id, for this example, `desktop`
3. Create the main unit:

```javascript
import NjDesktop from 'njdesktop';
import from 'njdesktop/src/assets/njDesktop.scss';

const desktop = new NjDesktop.NjDesktop(document.querySelector('#desktop'));
```

```html
<div id="desktop"></div>
```

> In order to be able to build with the included SCSS file, you will need a setup which supports a sass builder. We recommend using [Dart Sass](https://sass-lang.com/dart-sass). Using a sass builder is not in scope of this documentation.

You now have a working desktop environment.

---
[<-- Getting started](./getting_started.md) |
[Index](./index.md) |
[Main unit -->](./main_unit.md)