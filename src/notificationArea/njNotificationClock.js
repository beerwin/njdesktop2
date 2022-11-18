import HasEvents from "../hasEvents";

class NjNotificationClock extends HasEvents {
    constructor() {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-notification-widget');
        this.updateTime();
        this.interval = setInterval(this.updateTime.bind(this), 1000);
    }

    updateTime() {
        const d = new Date();
        this.element.innerText = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        this.element.title = d.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    setParent(parent) {
        parent.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        clearInterval(this.interval);
        this.element.parentNode.removeChild();
    }
}

export default NjNotificationClock;