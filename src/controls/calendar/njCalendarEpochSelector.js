const { default: HasEvents } = require("../../hasEvents");

export const NJ_EPOCH_MILLENNIA = 'millennia';
export const NJ_EPOCH_CENTURY = 'century';
export const NJ_EPOCH_DECADE = 'decade';
export const NJ_EPOCH_YEAR = 'year';
export const NJ_EPOCH_MONTH = 'month';
export const NJ_EPOCH_FULL = 'full';

const NjCalendarEpochSelector = class extends HasEvents {
    constructor(parentElement, epoch, options) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-epoch-selector');
        const currentMonth = options?.month ?? (new Date()).getMonth();
        for (let i in epoch) {
            const item = document.createElement('button');
            if (epoch[i].selected) {
                item.classList.add('selected');
            }
            item.innerText = epoch[i].label;
            item.addEventListener('click', () => {
                this.triggerListeners('input', {
                    year: epoch[i].year,
                    month: currentMonth,
                    display: options.display,
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

export default NjCalendarEpochSelector;