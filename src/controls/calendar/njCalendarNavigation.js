import HasEvents from "../../hasEvents";

const NjCalendarNavigation = class extends HasEvents {
    constructor(parentElement, options) {
        super();
        const d = new Date();
        this.year = options.year ?? d.getFullYear();
        this.month = options.month ?? d.getMonth();
        this.locale = options.locale ?? 'en';
        this.display = options.display ?? 'full';
        this.element = document.createElement('div');
        this.element.classList.add('nj-calendar-nav');
        this.jumpMonthBack = document.createElement('button');
        this.jumpMonthBack.classList.add('jump-month-back');
        this.jumpMonthBack.innerText = options.monthBackText ?? '<';
        this.jumpMonthBack.addEventListener('click', this.jumpMonthBackClick.bind(this));
        this.jumpMonthForward = document.createElement('button');
        this.jumpMonthForward.classList.add('jump-month-forward');
        this.jumpMonthForward.innerText = options.monthForwardText ?? '>';
        this.jumpMonthForward.addEventListener('click', this.jumpMonthForwardClick.bind(this));
        this.selectedMonthYear = document.createElement('button');
        this.selectedMonthYear.classList.add('selected-month');
        this.updateSelectedMonthYear();
        this.element.appendChild(this.jumpMonthBack);
        this.element.appendChild(this.selectedMonthYear);
        this.element.appendChild(this.jumpMonthForward);
        parentElement.appendChild(this.element);
    }

    updateSelectedMonthYear() {
        const d = new Date(this.year, this.month);
        if (this.display == 'none') {
            return '';
        }
        const content = this.display === 'year'
                ? d.toLocaleDateString(this.locale, {year: 'numeric'}) 
                : d.toLocaleDateString(this.locale, {year: 'numeric', month: "long"});
        this.selectedMonthYear.innerText = content;
    }

    set(options = {}){
        if (!isNaN(options.year)) {
            this.year = options.year;
        }

        if (!isNaN(options.month) && options.month >=0 && options.month <= 11) {
            this.month = options.month;
        }

        if (!!options.display) {
            this.display = options.display;
        }

        if (!!options.locale) {
            this.locale = options.locale;
        }

        this.triggerInputEvent();
        this.updateSelectedMonthYear();
    }

    triggerInputEvent() {
        this.triggerListeners('input', {
            year: this.year,
            month: this.month,
            locale: this.locale,
            display: this.display,
        });
    }

    jumpMonthBackClick() {
        if (this.month === 0) {
            this.month = 11;
            this.year -= 1;
        } else {
            this.month -= 1;
        }
        this.triggerInputEvent();
        this.updateSelectedMonthYear();
    }

    jumpMonthForwardClick() {
        if (this.month === 11) {
            this.month = 0;
            this.year += 1;
        } else {
            this.month += 1;
        }
        this.triggerInputEvent();
        this.updateSelectedMonthYear();
    }

    destroy() {
        super.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendarNavigation;