# Dialog action (buttons)

These are buttons which can be added to a [dialog footer](./windows.md#setting-a-footer). But anywhere else too.

```javascript
const button = new NjDialogAction(null, {
    title: "Ok",
    click: () => {
        alert("OK clicked");
    }
})
```

## Parameters

The calendar control accepts two parameters:

| Parameter | value | default | function |
| ------ | ------ | --- |-------- |
| `parentElement`| `DOM Node` | empty | The parent DOM element containing the calendar|
| `options` | object literal| empty | configuration |

## Options

| Parameter | value | default | function |
| ------ | ------ | --- |-------- |
| `title` | `string` | empty | Button text |
| `click` | `callback` | empty | any function, lambda or method. Method must bind `this` if class methods are used |

---
[<-- Calendar](./calendar.md) |
[Controls](./controls.md)|
[Icon lists-->](./icon_lists.md)
