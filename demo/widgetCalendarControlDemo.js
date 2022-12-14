import NjCalendar from "../src/controls/calendar/njCalendar";
import { NJ_CLOSE } from "../src/njWindowHeaderButtonTypes";
import { WS_NORMAL } from "../src/njWindowStates";
import NjNotificationClock from "../src/notificationArea/njNotificationClock";

const WidgetCalendarControlDemo = class {
    constructor(desktop) {
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
    }
}

export default WidgetCalendarControlDemo;