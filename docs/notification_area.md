# Notification area

The notification area is the place at the right edge of the Top bar.

It supports any number of widgets (e.g. clock, notification icons, etc.).

Currently only the clock widget is supported.

```javascript
    import {NjNotificationClock} from 'NjDesktop';
    const clockWidget = new NjNotificationClock();
    desktop.getNotificationArea().addWidget(clockWidget);
    let calendarWindow;
    
    clockWidget.on('click', () => {
    if (!calendarWindow) {
        calendarWindow = desktop.createWindow('calendar', WS_NORMAL, [NJ_CLOSE]);
        const calendar = new NjCalendar();
        calendarWindow.setContentObject(calendar);
        calendarWindow.on('destroy', () => calendarWindow = null);
    } else {
        if (calendarWindow.isMinimized()) {
            calendarWindow.restore();
        }

        calendarWindow.focus();
    }
})
```

---
[<-- Events](./events.md) |
[Index](./index.md)