import HasEvents from "../../hasEvents";
import { centuryList, decadeList, milleniaList, yearList } from "../../helpers/date";
import NjCalendarEpochSelector, { NJ_EPOCH_CENTURY, NJ_EPOCH_DECADE, NJ_EPOCH_FULL, NJ_EPOCH_MILLENNIA, NJ_EPOCH_MONTH, NJ_EPOCH_YEAR } from "./njCalendarEpochSelector";
import NjCalendarMonth from "./njCalendarMonth";
import NjCalendarMonthSelector from "./njCalendarMonthSelector";
import NjCalendarNavigation from "./njCalendarNavigation";

class NjCalendar extends HasEvents {
    constructor(parentElement, options) {
        super();
        this.options = Object.assign({}, {
            locale: 'en',
            date: new Date(),
        }, options);
        this.element = document.createElement('div');
        this.element.classList.add('nj-calendar');                
        this.currentDate = this.options.date;
        this.currentDate.setHours(0,0,0,0);
        this.selectedMonth = this.currentDate.getMonth();
        this.selectedYear = this.currentDate.getFullYear();
        const state = {
            locale: this.options.locale,
            year: this.selectedYear,
            month: this.selectedMonth,
            display: NJ_EPOCH_FULL,
        };
        this.navigation = new NjCalendarNavigation(this.element, state);
        this.displayState = NJ_EPOCH_FULL;
        this.createSelector(state);
        if (parentElement) {
            parentElement.appendChild(this.element);
        }
        this.navigation.on('input', this.navDisplayStateChange.bind(this));
        this.navigation.on('displayStateChange', this.navDisplayStateChange.bind(this));
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    selectorInput(event, state) {
        const newState = this.nextState(state.display);
        this.navigation.set({...state, display: newState, preventUpdateEvent: true});
        if (newState === NJ_EPOCH_FULL) {
            this.currentDate = state.selected ?? this.currentDate;
            this.triggerListeners('input', this.currentDate);
        } 
        this.createSelector({...state, display: newState});
    }

    nextState(displayState) {
        switch (displayState) {
            case NJ_EPOCH_MILLENNIA: 
                return NJ_EPOCH_CENTURY;
            case NJ_EPOCH_CENTURY: 
                return NJ_EPOCH_DECADE;
            case NJ_EPOCH_DECADE: 
                return NJ_EPOCH_YEAR;
            case NJ_EPOCH_YEAR: 
                return NJ_EPOCH_MONTH;
            case NJ_EPOCH_MONTH: 
                return NJ_EPOCH_FULL;
            default: 
                return NJ_EPOCH_FULL;
        }
    }

    navDisplayStateChange(event, state) {
        this.createSelector(state);
    }

    createSelector(state) {
        if (this.selector) {
            this.destroySelector();
        }
        switch (state.display) {
            case NJ_EPOCH_MILLENNIA:
                this.selector = new NjCalendarEpochSelector(this.element, milleniaList(state.year), {...state, selected: this.currentDate});
                break;
            case NJ_EPOCH_CENTURY:
                this.selector = new NjCalendarEpochSelector(this.element, centuryList(state.year), {...state, selected: this.currentDate});
                break;
            case NJ_EPOCH_DECADE:
                this.selector = new NjCalendarEpochSelector(this.element, decadeList(state.year), {...state, selected: this.currentDate});
                break;
            case NJ_EPOCH_YEAR:
                this.selector = new NjCalendarEpochSelector(this.element, yearList(state.year), {...state, selected: this.currentDate});
                break;
            case NJ_EPOCH_MONTH:
                this.selector = new NjCalendarMonthSelector(this.element, {...state, selected: this.currentDate});
                break;
            case NJ_EPOCH_FULL:
                this.selector = new NjCalendarMonth(this.element, {...state, selected: this.currentDate});
                break;
            }

        this.selector.on('input', this.selectorInput.bind(this));
    }

    destroySelector() {
        this.selector.off('input', this.selectorInput.bind);
        this.selector.destroy();
    }

    destroy() {
        super.destroy();
        this.destroySelector();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendar;