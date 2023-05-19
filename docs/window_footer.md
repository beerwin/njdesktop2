# Window footer (status bar)

The window footer is another footer control for windows. It's role is to function as the window's status bar.

A status bar can be added to a window the following way:

```javascript
const statusBar = new NjWindowFooter();
demoWindow.setFooter(statusBar);
```

The `getFooter` getter from the `NjWindow` instance will return the instance of the `NjWindowFooter` class, after it has been set to a window.

## Adding panes to a window footer

A window footer supports multiple panes. Call the `addPane` method of the `NjWindowFooter` instance:

```javascript
const statusBar = demoWindow.getFooter();
const pane = statusBar.addPane();
```

The `addPane` method will return the newly added `NjWindowFooterPane` instance.

## Removing a pane from a status bar

```javascript
const statusBar = demoWindow.getFooter();
statusBar.removePane(pane);
```

## Footer pane methods

The `NWindowjFooterPane` class has the following methods:

| Method   | Function  | Parameters|
|----------|-----------|-----------|
|  `SetContent` | Specifies the footer pane content as a DOM node. The DOM node will be moved inside the footer pane | `DOMNode` `element` |
| `SetContentText` | Specifies the footer pane content as a string (innerText) | `String` `text` |
| `SetContentObject` | Specifies the footer pane content as an object. The object must define the `destroy` method (even if it does nothing) | `Object` `object` |

> These methods are alternative. The side effect of one will overwrite the side effect of the other.

## Footer pane events

| Event   | Function  | Parameters|
|----------|-----------|-----------|
| `click` | Clieck event on the footer pane | `{Event nativeEvent }`

-----

[<-- Dialog Footer](./dialog_footer.md) |
[Index](./index.md)
