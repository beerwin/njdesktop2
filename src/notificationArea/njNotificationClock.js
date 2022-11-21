import HasEvents from "../hasEvents";

class NjNotificationClock extends HasEvents {
    constructor() {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-notification-widget');
        this.updateTime();
        this.interval = setInterval(this.updateTime.bind(this), 1000);
        this.element.addEventListener('click', () => {
            this.triggerListeners('click', {
                sender: this
            });
        })
    }

    updateTime() {
        const d = new Date();
        this.element.innerText = d.toLocaleTimeString(['en'], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        this.element.title = d.toLocaleDateString(['en'], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
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