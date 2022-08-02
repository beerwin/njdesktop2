# Icon lists

Icon lists provide beautiful icon lists for organizing your app's features. The constructor accepts a nullable `parentElement` and a `config` object. If the `parentElement` is set, the icon list will show up inside that element right away. You can also use `.setParent()` to set a listView's parent element.

```javascript
const iconList = new NjDesktop.NjIconList(null, {
    orientation: NjDesktop.NjIconlistOrientation.VERTICAL,
    view: NjDesktop.NjIconlistView.M,
});
```

## Config options

| Option | values | default | function |
| ------ | ------ | --- |-------- |
| `orientation` | `NjDesktop.NjIconlistOrientation.VERTICAL, NjDesktop.NjIconlistOrientation.HORIZONTAL` | `NjDesktop.NjIconlistOrientation.VERTICAL` | the alignment of the icons |
| `view` | `NjDesktop.NjIconlistView.S, NjDesktop.NjIconlistView.M, NjDesktop.NjIconlistView.L, NjDesktop.NjIconlistView.XL, NjDesktop.NjIconlistView.TILE` | `NjDesktop.NjIconlistView.M` | icon size/arrangement
| `preventScroll` | boolean | `false` | shows icons that  fit in the view only

The icon list can support multiple selection. Multiple icons can be selected by holding Ctrl and/or Shift keys. Getting the selected items can be done by filtering the `icons` property:

```javascript
const selectedIcons = iconList.icons.filter(i => i.isSelected());
```

# Icons

You can add icons with the `.addIcon()` method. The method will accept a config object and return an `NjIcon` instance.

## Config options

| Option | values | default | function |
| ------ | ------ | --- |-------- |
| `title`| `string` | empty | the icon's title|
| `icon` | any value supported by the CSS `background-image` | empty | the icon picture |
| `metadata` | `object` | empty | additional data carried by the icon (non-visible) |
| `tileDetailKey` | `string` | empty | takes the value with the specified key from `metadata` and displays it in tile view |
| `dblclick` | callable | empty | double click event handler, can also be assigned with `.on('dblclick', ...)` |

Title and icon can be changed with `setTitle()` and `setIcon`, respectively.
`dblclick` event handlers can be assigned/removed with `.on()` and `.off()`;

---
[<-- Toolbars](./toolbars.md) |
[Index](./index.md) |
[List views -->](./listviews.md)