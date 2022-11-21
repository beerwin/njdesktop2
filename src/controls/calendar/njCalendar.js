import HasEvents from "../../hasEvents";
import NjCalendarMonth from "./njCalendarMonth";
import NjCalendarNavigation from "./njCalendarNavigation";

class NjCalendar extends HasEvents {
    constructor(parentElement, options) {
        super();
        this.options = Object.assign({}, {
            locale: 'en',
        }, options);
        this.element = document.createElement('div');
        this.element.classList.add('nj-calendar');                
        this.currentDate = new Date();
        this.navigation = new NjCalendarNavigation(this.element, {
            locale: this.options.locale,
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth(),
            display: 'full',
        });
        this.createMonthCalendar();
        if (parentElement) {
            parentElement.appendChild(this.element);
        }
        this.navigation.on('input', this.navInput.bind(this));
    }

    navInput(event, data) {
        console.log('data from navi', data.year, data.month)
        this.monthCalendar.set(data);
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    createMonthCalendar() {
        this.monthCalendar = new NjCalendarMonth(this.element, {
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth(),
            locale: this.options.locale,
        });
    }

    destroyMonthCalendar() {
        this.monthCalendar.off('input', this.navInput);
        this.monthCalendar.destroy();
    }

    destroy() {
        super.destroy();
        this.destroyMonthCalendar();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendar;