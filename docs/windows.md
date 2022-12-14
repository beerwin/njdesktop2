# Windows

Windows are the individual containers for grouping components for individual app features. They can contain a menu, multiple toolbars, a footer and of course, the most important thing, the main content.

## Creating windows

Creating windows is as simple as calling a method of the main unit:

```javascript
const aWindow = desktop.createWindow('Test window name');
```

The method has 3 parameters:

| Parameter name | possible values (type) | default | what it does |
| -------------- | --------------- | ---- |------------ |
| `title`          | `string`        | empty |the title in the window's title bar | 
| `state`          | `WS_MINIMIZED`, `WS_NORMAL`, `WS_MAXIMIZED` | `WS_NORMAL` | the initial state of the window
| `availableButtons` | `NJ_MINIMIZE`, `NJ_MAXIMIZE`, `NJ_CLOSE` | `[ NJ_MINIMIZE, NJ_MAXIMIZE, NJ_CLOSE]` | the available buttons in the header

The method returns a `NjWindow` instance.

```javascript
const aWindow = desktop.createDialog({
    title: 'whatever',
    width: 500,
    height: 200
});
```

The createDialog method accepts a config object with the window `title`, its `width` and it's `height`. All of them are required. The window is automatically positioned at the desktop's center.

# Adding a menu

Windows can have a single menu. Call the `setMenu()` method of the window instance with a valid `NjMenu` instance:

```javascript
const menu = new NjDesktop.NjMenu(...);

w.setMenu(menu);
```

# Adding/removing toolbars

Windows can have multiple toolbars. Each toolbar is placed in a new row:

```javascript
const toolbar = new NjDesktop.Toolbar(...);

w.addToolbar(toolbar);
```

Toolbars can also be removed:

```javascript
const toolbar = new NjDesktop.Toolbar(...);

w.addToolbar(toolbar);
w.removeToolbar(toolbar);
```

# Setting content

Content can be set in two ways: 

- by setting a DOM node as content
- by setting an object as content

## Using a DOM node as content:

```javascript
w.setContentElement(document.querySelector('#whatever'));
```

This appends the node to the window's content container.

> Important: The window doesn't care about the content DOM node when it is destroyed. The node will also be destroyed. If you want to reuse the DOM node, make sure you use a clone of it.

## Using an object as content:

```javascript
w.setContentObject(someObject);
```

The object must implement the following methods:

| method | what it does |
| ---- | ---- |
| `setParent` | appends the element generated by the object to the specified DOM node |
| `destroy` | destructor, makes sure everything is removed properly |

# Setting a footer

Windows can have footers. Currently only the dialog footer is supported. 

```javascript
w.setFooter(footerObject);
```

If you implement a new class, it must implement the following methods:

| method | meaning |
| --- | --- |
| `setParent` | appends the footer's root element to the window footer container |
| `getComputedHeight` | returns the footer's computed height for calculating window content heights |
| `destroy` | cleans up the footer instance |


The footer can be queried:

```javascript
const footer = w.getFooter();
```

Footers can also be removed.

```javascript
w.clearFooter();
```

# Controlling window behavior

## Adding/removing CSS classes to a window

```javascript
w.addClass(className);
w.removeClass(className);
```

## Changing/retrieving title

```javascript
w.setTitle(title);
w.getTitle(title);
```

## Programmatically resizing the window

```javascript
w.setWidth(width);
w.setHeight(height);

/// we might want to trigger the resized event
w.triggerListeners(`resized`)
```

## Programmatically moving the window

```javascript
w.setTop(top);
w.setLeft(left);

/// we might want to trigger the moved event
w.triggerListeners(`moved`)
```

## Retrieving window position and size

```javascript
const width = w.getWidth();
const height = w.getHeight();
const top = w.getTop();
const left = w.getLeft();
```

## Programmatically Changing window state

```javascript
w.minimize();
w.restore();
w.maximize();
```

## Closing a window

> The close method is an asynchronous method.

```javascript
w.close();
```

## Showing/hiding a window

```javascript
w.show();
w.hide();
```

## Moving the window over the Z axis (bring to front, send to back)

```javascript
w.setZIndex(10);
```

## Bringing a window into focus

This method also brings the window to front.

```javasscript
w.focus();
```

## Removing the focus from a window

```javascript
w.blur();
```

## Single instance windows

You can implement single instance windows by saving them in a variable and reference it later when dealing with it.


```javascript
    let calendarWindow;
    
    /// ...
    /// on some click event

    if (!calendarWindow) {
        calendarWindow = desktop.createWindow('calendar', WS_NORMAL, [NJ_CLOSE]);
        calendarWindow.on('destroy', () => calendarWindow = null);
    } else {
        if (calendarWindow.isMinimized()) {
            calendarWindow.restore();
        }

        calendarWindow.focus();
    }

    /// ...
```

# Events

Windows support multiple events. Each event listener can have multiple handlers.
Event handlers have 2 parameters: `source`, `data`. `source` is the object which emits the event, `data` contains information related to the event.

Events can be attached with the `.on()` method. Detachable with the (`.off()`) method. The event handlers can be programmatically triggered with the `triggerListeners(listenerGroup, data)` method. The `triggerListeners` method is asynchronous.

>Data sent in the `triggerListeners` method must match the structure of the data parameter of the appropriate listener.

> Events support and await asynchronous handlers.

| Event | data | information |
| ----- | ------------------- | ----------- |  
| `titleUpdated` | data contains the new title | used mainly by the task bar buttons |
| `resize` | `{oldRect, newRect}` | both the old and new window bounding rectangle. Triggered on each value change, during resize
| `resized` | `{oldRect, newRect}` | triggered at the end of the resize operation, when the mouse button is released; data contains the position and size before resize and after resize; also triggered after tile and cascade
| `move` | `{oldRect, newRect}` | event emitted while dragging the window; data contains old and new position and size
| `moved` | `{oldRect, newRect}` | triggered after the move operation is finished (the mouse button is released); contains old position and size before dragging and the new position and size after dragging; also triggered after tile and cascade
| `stateChange` | current window state | triggered after every minimize, maximize, restore, taskbar button click, tile, cascade
| `minimize` | `undefined` | triggered after minimize
| `maximize` | `undefined` | triggered after maximize
| `restore` | `undefined` | triggered after restore
| `hide` | `undefined` | triggered after hide
| `show` | `undefined` | triggered after show
| `focus` | `undefined` | triggered after focus
| `blur` | `undefined` | triggered after window lost focus
| `beforeCLose` | `undefined` | triggered when the window is about to close (nothing is destroyed yet). The handler must return a boolean value. If there are multiple handlers, the value of the last handler is used.
| `close` | `undefined` | triggered after `beforeClose`
| `destroy` | `undefined` | triggered after the window is destroyed.

---
[<-- Main unit](./main_unit.md) |
[Index](./index.md) |
[Menus -->](./menus.md)