# Getting started

To set up a working desktop, create a new element:

1. Import NjDesktop and it's main SCSS file.
2. In your markup, have an element with an arbitrary id, for this example, `desktop`
3. Create the main unit:

```javascript
import NjDesktop from 'njdesktop';
import 'njdesktop/src/assets/njDesktop.scss';

const desktop = new NjDesktop.NjDesktop(document.querySelector('#desktop'));
```

```html
<div id="desktop"></div>
```

You now have a working desktop environment.

---
[Index](./index.md) | [Installation](./installation.md)
