# Toolbars

Toolbars can be added anywhere in the system. The constructor has a nullable parameter (parentElement). If not specified, the toolbar won't be visible. `NjWindow.addToolbar()` will add it to the toolbar container of the `NjWindow` instance of whose `addToolbar` method was called.

```javascript
const toolbar = new NjDesktop.ToolBar();

// add toolbar to a window
w.addToolbar(toolbar);
```

The method accepts an optional config parameter which has the following properties:

| Option | values | function |
| ------ | ------ | -------- |
| `classes` | array | array of CSS classes |

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

| Option | values | function | availability |
| ------ | ------ | -------- | ------------- |
| `type` | `NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT`, `NJ_TOOLBUTTON_INPUT` | button type | all types
| `icon` | string, any value supported by CSS, | button icon | `NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT`
|`background-image` | menu item icon, can be omitted, | |`NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT`
| `title` | string | button text | `NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT`
| `classes` | array | array of CSS classes | all types
| `value` | string | the value of the editable toolbar control | `NJ_TOOLBUTTON_INPUT`
| `click` | callable | the `click` event listener. Can also be attached later, using the `.on()` method. | `NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT`
| `change` | callable | the `click` event listener. Can also be attached later, using the `.on()` method. | `NJ_TOOLBUTTON_INPUT`

Tool buttons can be enabled/disabled programmatically, based on your needs:

```javascript
const button = toolbar.addToolButton({
            title: "Tool button icon only",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(...)',
        });

button.setEnabled(true|false)  
```

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