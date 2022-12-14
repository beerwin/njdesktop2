import HasEvents from "../../hasEvents";
import { dayOfWeek } from "../../helpers/date";
import NjCalendarDay from "./njCalendarDay";

class NjCalendarMonth extends HasEvents {
    constructor(parentElement, options) {
        super();
        this.parentElement = parentElement;
        this.year = options.year;
        this.month = options.month;
        this.locale = options.locale ?? 'en';
        this.selected = options.selected ?? null;
        this.days = [];
        this.drawMonth();
    }

    drawMonth() {
        if (!!this.element) {
            this.clearDays();
            this.removElement();
        }
        this.createElement();
        this.currentDate = new Date();
        const monthDate = new Date(this.year, this.month);
        const firstDay = monthDate.getDate();
        const dayOfWeek = monthDate.getDay();
        const lastDay = this.daysInMonth(this.year, this.month);

        for (let i = 0; i <= dayOfWeek -1; i++) {
            const td = document.createElement('td');
            this.days.push(new NjCalendarDay(td, {
                dummy: true,
            }));
        }

        for (let i = firstDay; i <= lastDay; i++) {
            const td = document.createElement('td');
            const date = new Date(this.year, this.month, i);
            date.setHours(0,0,0,0);
            const item = new NjCalendarDay(td, {
                data: {
                    date,
                    year: this.year,
                    month: this.month,
                    locale: this.locale,
                },
                locale: this.locale,
            });
            if (this.selected?.getTime() === date.getTime()) {
                item.setSelected(true);
            }
            item.on('click', this.handleDayClick.bind(this));
            this.days.push(item);
        }

        let row;
        for (let i = 0; i < this.days.length; i++) {
            if (!row) {
                row = document.createElement('tr');
            }
            row.appendChild(this.days[i].parentElement);
            if ((i + 1) % 7 === 0) {
                this.element.appendChild(row);
                row = document.createElement('tr');
            } 
            if (i === this.days.length - 1) {
                const daysLeft = 7 - i % 7;
                for (let j = 0; j < daysLeft - 1; j++) {
                    const td = document.createElement('td');
                    this.days.push(new NjCalendarDay(td, {
                        dummy: true,
                    }));
                    row.appendChild(td);
                }
                this.element.appendChild(row);
                break;
            }
            
        }
        this.parentElement.appendChild(this.element);
    }

    daysInMonth() {
        return 32 - (new Date(this.year, this.month, 32)).getDate();
    }

    createElement() {
        this.element = document.createElement('table');
        this.element.classList.add('nj-calendar-month');
        const dayRow = document.createElement('tr');
        dayRow.classList.add('day-row');
        for (let i = 1; i <= 7; i++) {
            const cell = document.createElement('th');
            cell.innerText = dayOfWeek(i);
            dayRow.appendChild(cell);
        }
        this.element.appendChild(dayRow);
    }

    removElement() {
        this.element.parentNode.removeChild(this.element);
        this.element = null;
    }

    handleDayClick(e, data) {
        for (let x in this.days) {
            if (this.days[x].isSelected()) {
                this.days[x].setSelected(false);
            }

            data.sender.setSelected(true);
        }
        this.triggerListeners('input', {...data, selected: data.date});
    }

    clearDays() {
        for (let x in this.days) {
            this.days[x].off('click', this.handleDayClick);
            this.days[x].destroy();
        }
        this.days = [];
    }

    destroy() {
        super.destroy();
        this.clearDays();
        this.removElement()
    }

}

export default NjCalendarMonth;