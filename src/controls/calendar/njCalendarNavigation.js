import HasEvents from "../../hasEvents";
import { centuryOf, decadeOf, millenniaOf } from "../../helpers/date";
import { NJ_EPOCH_CENTURY, NJ_EPOCH_DECADE, NJ_EPOCH_FULL, NJ_EPOCH_MILLENNIA, NJ_EPOCH_MONTH, NJ_EPOCH_YEAR } from "./njCalendarEpochSelector";

const NjCalendarNavigation = class extends HasEvents {
    constructor(parentElement, options) {
        super();
        const d = new Date();
        this.year = options.year ?? d.getFullYear();
        this.month = options.month ?? d.getMonth();
        this.locale = options.locale ?? 'en';
        this.display = options.display ?? NJ_EPOCH_FULL;
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
        this.selectedMonthYear.addEventListener('click', this.selectedMonthYearClick.bind(this));
        this.updateSelectedMonthYear();
        this.element.appendChild(this.jumpMonthBack);
        this.element.appendChild(this.selectedMonthYear);
        this.element.appendChild(this.jumpMonthForward);
        parentElement.appendChild(this.element);
    }

    updateSelectedMonthYear() {
        const d = new Date(this.year, this.month);
        switch (this.display) {
            case NJ_EPOCH_MILLENNIA:
                this.selectedMonthYear.innerText = '...';
                break;
            case NJ_EPOCH_CENTURY:
                const millennia = millenniaOf(this.year);
                this.selectedMonthYear.innerText = `${millennia.start} - ${millennia.end}`;
                break;
            case NJ_EPOCH_DECADE:
                const century = centuryOf(this.year);
                this.selectedMonthYear.innerText = `${century.start} - ${century.end}`;
                break;
            case NJ_EPOCH_YEAR: 
                const decade = decadeOf(this.year);
                this.selectedMonthYear.innerText = `${decade.start} - ${decade.end}`;
                break;
            case NJ_EPOCH_MONTH:
                this.selectedMonthYear.innerText = d.toLocaleDateString(this.locale, {year: 'numeric'});
                break;
            default:
            case NJ_EPOCH_MONTH:
                this.selectedMonthYear.innerText = d.toLocaleDateString(this.locale, {year: 'numeric', month: "long"});
                break;
        }
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

        if (!options.preventUpdateEvent) {
            this.triggerInputEvent();
        }
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
        switch (this.display) {
            case NJ_EPOCH_MILLENNIA:
                // do nothing
                break;
            case NJ_EPOCH_CENTURY:
                this.year -= 1000;
                break;
            case NJ_EPOCH_DECADE:
                this.year -= 100;
                break;
            case NJ_EPOCH_YEAR:
                this.year -= 10;
                break;
            case NJ_EPOCH_MONTH: 
                this.year--;
                break;
            default:
            case NJ_EPOCH_FULL:
                if (this.month === 0) {
                    this.month = 11;
                    this.year -= 1;
                } else {
                    this.month -= 1;
                }
                break;
        }

        this.triggerInputEvent();
        this.updateSelectedMonthYear();
    }

    jumpMonthForwardClick() {
        switch (this.display) {
            case NJ_EPOCH_MILLENNIA:
                // do nothing
                break;
            case NJ_EPOCH_CENTURY:
                this.year += 1000;
                break;
            case NJ_EPOCH_DECADE:
                this.year += 100;
                break;
            case NJ_EPOCH_YEAR: 
                this.year+=10;
                break;
            case NJ_EPOCH_MONTH: 
                this.year++;
                break;
            default:
            case NJ_EPOCH_FULL:
                if (this.month === 11) {
                    this.month = 0;
                    this.year += 1;
                } else {
                    this.month += 1;
                }
                break;
        }
        this.triggerInputEvent();
        this.updateSelectedMonthYear();
    }

    selectedMonthYearClick() {
        switch (this.display) {
            case NJ_EPOCH_MILLENNIA:
                return;
            case NJ_EPOCH_CENTURY:
                this.display = NJ_EPOCH_MILLENNIA;
                break;
            case NJ_EPOCH_DECADE:
                this.display = NJ_EPOCH_CENTURY;
                break;
            case NJ_EPOCH_YEAR:
                this.display = NJ_EPOCH_DECADE;
                break;
            case NJ_EPOCH_MONTH:
                this.display = NJ_EPOCH_YEAR;
                break;
            case NJ_EPOCH_FULL:
                this.display = NJ_EPOCH_MONTH;
                break;
        }
        this.updateSelectedMonthYear();
        this.triggerListeners('displayStateChange', {
            year: this.year,
            month: this.month,
            locale: this.locale,
            display: this.display,
        });
    }

    destroy() {
        super.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendarNavigation;