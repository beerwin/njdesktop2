# Toolbars

Toolbars can be added anywhere in the system. The constructor has a nullable parameter (parentElement). If not specified, the toolbar won't be visible. `NjWindow.addToolbar()` will add it to the toolbar container of the `NjWindow` instance of whose `addToolbar` method was called.

```javascript
const toolbar = new NjDesktop.ToolBar();

// add toolbar to a window
w.addToolbar(toolbar);
```

## Tool buttons

A toolButton can be created by calling the `addToolButton` method of a toolbar instance with a `config` object.

```javascript
const button = toolbar.addToolButton({
            title: "Tool button icon only",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(...)',
        });
```

### Config options

| Option | values | function |
| ------ | ------ | -------- |
| `type` | `NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT` | button type |
| `icon` | string, any value supported by CSS `background-image` | menu item icon, can be omitted
| `title` | string | button text 
| `click` | callable | the `click` event listener. Can also be attached later, using the `.on()` method.


## Menus in toolbar

To provide dropdown menus in a toolbar, the toolbar can accept menus as subcomponents.

```javascript
const toolbarMenu = new NjDesktop.NjMenu();
        const toolbarMenuItem = new NjDesktop.NjMenuItem({
            title: "Menu in toolbar with text", 
            icon: 'url(...)'
        });
        toolbarMenu.addItem(toolbarMenuItem);
        const toolbarMenuItem2 = new NjDesktop.NjMenuItem({title: "Menu item 2"})
        toolbarMenuItem.addItem(toolbarMenuItem2);
        const toolbarMenuItem3 = new NjDesktop.NjMenuItem({title: "Menu item 3"})
        toolbarMenuItem.addItem(toolbarMenuItem3);

        const toolbarMenuItem4 = new NjDesktop.NjMenuItem({
            title: "Menu item in toolbar", 
            icon: 'url(...)',
            iconOnly: true
        });
        toolbarMenu.addItem(toolbarMenuItem4);
        const toolbarMenuItem5 = new NjDesktop.NjMenuItem({title: "Menu item 2"})
        toolbarMenuItem4.addItem(toolbarMenuItem5);

        toolbar.addMenu(toolbarMenu);
```

See [menus](./menus.md) for details about menus.

---
[<-- Menus](./menus.md) |
[Index](./index.md) |
[Events -->](./events.md)