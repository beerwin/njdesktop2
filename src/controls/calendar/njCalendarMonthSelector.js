import { NJ_EPOCH_MONTH } from "./njCalendarEpochSelector";

const { default: HasEvents } = require("../../hasEvents");

const NjCalendarMonthSelector = class extends HasEvents {
    constructor(parentElement, options) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-epoch-selector');
        const currentYear = (new Date()).getFullYear();
        const year = options?.year ?? currentYear;
        for (let i = 0; i <= 11; i++) {
            const d = new Date(year, i);
            const item = document.createElement('button');
            item.innerText = d.toLocaleDateString(options.locale ?? 'en', {month: "long"});
            if (i === options.month) {
                item.classList.add('selected');
            }
            item.addEventListener('click', () => {
                this.triggerListeners('input', {
                    year,
                    month: i,
                    display: NJ_EPOCH_MONTH,
                    locale: options.locale,
                });
            });
            this.element.appendChild(item);
        }
        parentElement.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendarMonthSelector;