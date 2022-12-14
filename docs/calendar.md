# Calendar

It's a calendar control for selecting dates.

Supports epoch filtering on multiple levels when selecting dates(months, years, decades, centuries, millenia): 
- clicking on the middle button of the calendar navigator goes up one level. 
- When selecting an epoch in the selector, the filtering goes down one level.

This makes selecting a specific date very easily, even if it's in a different millenia. No long typing, dropdowns or scrolling through an endless list.

Supports date formatting locales (language support).

```javascript
const calendar = new NjCalendar(document.querySelector('.whatever'));
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
| `date` | `Date` | current date | Initially selected date |
| `locale` | `string` | `'en'` | any Javascript locale supported by `.toLocale*String` |

## Caveats

- Different week start days (e.g. Monday instead of Sunday) are not tested. They are expected to fail. Testers needed.
- 32-bit clients will fail to represent anything that is below or above the 32-bit int values. This will cause the component to fail in these circumstances. This is a known issue.

---
[<-- Controls](./controls.md) |
[Index](./index.md)|
[Dialog Actions (buttons)-->](./dialog_actions.md)