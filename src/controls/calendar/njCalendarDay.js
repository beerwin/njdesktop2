import HasEvents from "../../hasEvents";

class NjCalendarDay extends HasEvents {
    constructor(parentElement, options) {
        super();
        this.element = document.createElement('button');
        this.element.classList.add('nj-calendar-day');
        if (parentElement) {
            this.parentElement = parentElement;
            parentElement.appendChild(this.element);
        }
        if (options.dummy) {
            this.element.setAttribute('disabled', true);
            this.element.classList.add('dummy');
            this.element.innerText = '.';
            return;
        }
        this.data = options.data;
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        const itemDate = new Date(this.data.date.getTime());
        itemDate.setHours(0,0,0,0);
        if (currentDate.getTime() === itemDate.getTime()) {
            this.element.classList.add('current-date');
        }
        const dayNrNode = document.createElement('span');
        dayNrNode.innerText = itemDate.getDate();
        this.element.appendChild(dayNrNode);
        this.element.addEventListener('click', this.handleClick.bind(this));
        this.selected = false;
    }

    setSelected(value) {
        this.selected = value;
        if (!this.selected && this.element.classList.contains('selected')) {
            this.element.classList.remove('selected');
        } else {
            this.element.classList.add('selected');
        }
    }

    handleClick() {
        this.setSelected(true);
        this.triggerListeners('click', this.data);
    }

    destroy() {
        super.destroy();
        this.element.removeEventListener('click', this.handleClick);
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendarDay;