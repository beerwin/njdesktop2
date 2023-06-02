# Main unit (Desktop)

The desktop is the core component of NjDesktop 2. It is the main container for all of the other components.

## Setup

The main unit can be created by instantiating the main unit:

```javascript
const desktop = new NjDesktop.NjDesktop(document.querySelector('#desktop'), {
        theme: 'redmond7',
        backgroundImage: '',
        backgroundPosition: 'center center',
        backgroundSize: 'auto',
    }
)
```

The constructor of the main unit accepts 2 paramters:

| Parameter | accepted values | meaning |
| --- | --- | --- |
| `element` | a valid DOM element returned by `document.querySelector` | the element that will be used as the parent node for NjDesktop |
| `config` | a Javascript object | settings for the main unit |

The `config` parameter can have the following members:

| name  | accepted value(s) | meaning |
| --- | --- | --- |
| `theme` | any valid CSS class. Available off the box: `null` (default win9x style theme), `redmond7`, Windows 7 style theme, `cleanLight`, `cleanDark`, sleek Windows 10 style theme | The look and feel | 
| `dark`  | `true`,`false` | provides a hint that the theme is dark or light
| `backgroundImage` | any value accepted by CSS `background-image` | background image of the desktop |
| `backgroundPosition` | any value accepted by CSS `background-position` | the positioning of the background image |
| `backgroundSize` | any value accepted by CSS `background-size` | the size of the background image |

The theme can be changed any time by calling the `setTheme()` method of the main unit. The theme is changed immediately. The method accepts the same values as the `theme` and `dark` config options:

```javascript
desktop.setTheme('cleanDark', true);
```

## Changing theme

```javascript
desktop.setTheme('redmond7', false);
```

The theme change triggers a `themeChange` event on the main unit which reports the new theme and tint(dark) (`{theme: 'cleanDark', dark: true}`). This event can be used to update components which are theme sensitive (such as icons or window content). See the demos with toolbars for examples.

The background image can also be changed by calling the `setBackgroundImage` method.

## Changing background image

```javascript
desktop.setBackgroundImage('url(...)');
```

The background image is changed immediately.

## Tiling windows:

> Tiling supports an unlimited number of windows.

```javascript
desktop.tile()
```

## Cascading windows

```javascript
desktop.cascade()
```

# Contents

The main component holds the following other containers: 

1. Top bar
2. Window container, holding the windows and the desktop icon list.
3. Task bar, holding a toolbar and the window buttons.

## Top bar

This is a menu bar which can hold a menu for the desktop. It is accessible by calling the `getMenu()` method of the main unit.

> When the main unit is created, the top menu is created automatically.

```javascript
const desktop = new NjDesktop.NjDesktop(...);

const menu = desktop.getMenu().
```

The `getMenu()` method will return an instance of `NjMenu`.

## Window container

### Windows

The window container holds all the windows created by the main unit. The window list, and the standard behavior of windows is maintained by an internal window manager. The container doesn't have any methods. Window creation is facilitated by the main unit and the recommended way of creating windows is by using the `createWindow` and `createDialog` methods of the main unit.

### Desktop icons

The desktop icons are contained by a standard `NjIconList` instance with specific settings for the desktop. Icons are arranged vertically in an automatic way.

The icon list is accessible by calling the `getIconList` method of the main unit.

> When the main unit is created, the desktop icon list is created automatically.

```javascript
const desktop = new NjDesktop.NjDesktop(...);

const iconList = desktop.getIconList().
```

### Task bar

The task bar holds a toolbar and the taskbar icon button list.

The taskbar button list is a horizontally scrollable button list and it's content is automatically maintained by the internal window manager. The focused window's button is always in the view.

The taskbar is not intended to be directly accessed. Toolb buttons and menus can be added by calling the main unit's appropriate methods:

#### Adding a tool button:

> Taskbar tool buttons are instances of the ToolButton class

```javascript
const desktop = new NjDesktop.NjDesktop(...);

const config = {
    // standard NjToolButton configuration
    ...
}

const toolobutton = desktop.addTaskbarToolButton(config).
```

#### Adding a submenu:

> Taskbar submenus are instances of the NjMenu class.

```javascript
const desktop = new NjDesktop.NjDesktop(...);

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

desktop.addTaskbarSubMenu(taskbarSubMenu);
```

---
[<-- Installation](./installation.md) |
[Index](./index.md) |
[Windows -->](./windows.md)