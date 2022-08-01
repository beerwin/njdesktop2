# Menus

Menus can be used almost anywhere in NjDesktop 2, from the top bar of the desktop, to windows and even inside toolbars (including task bar's own toolbar). Menus don't have any configuration options.

```javascript
const menu = new NjDesktop.NjMenu();
```

## Menu items

Menus can have many items, which themselves can have child items.

```javascript
const taskbarSubMenu = new NjDesktop.NjMenu();
const themeMenu = new NjDesktop.NjMenuItem({title: "Choose theme"});
taskbarSubMenu.addItem(themeMenu);
const redmond7MenuItem = new NjDesktop.NjMenuItem({
    title: "redmond 7 theme",
    click: () => {
        desktop.setTheme('redmond7');
    }
})
themeMenu.addItem(redmond7MenuItem);

const defaultThemeMenuItem = new NjDesktop.NjMenuItem({
    title: "Default theme",
    click: () => {
        desktop.setTheme(null);
    }
});

themeMenu.addItem(defaultThemeMenuItem);
```
Menu items have one `config` constructor parameter.

### Options

| Option | values | function |
| ------ | ------ | -------- |
| `iconOnly` | boolean | tells that the menu item should show the icon only |
| `icon` | string, any value supported by CSS `background-image` | menu item icon, can be omitted
| `text` | string | menu item text 
| `click` | callable | the `click` event listener. Can also be attached later, using the `.on()` method.


---
[<-- Windows](./windows.md) |
[Index](./index.md) |
[Toolbars -->](./toolbars.md)