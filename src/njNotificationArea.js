import HasEvents from "./hasEvents";

class NjNotificationArea extends HasEvents {
    constructor(parentElement) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-notification-area');
        this.parent = parentElement;
        this.parent.appendChild(this.element);
        this.widgets = [];
    }

    addWidget(widget) {
        this.widgets.push(widget);
        widget.setParent(this.element);
    }

    removeWidget(widget) {
        widget.destroy();
        this.widgets = this.widgets.filter(w => w !== widget);
    }

    destroy() {
        super.destroy();
        this.element.parentNode.removeChild(this.element);
        for (let i in this.widgets) {
            this.widgets[i].destroy();
        }
        this.widgets = [];
    }
}

export default NjNotificationArea;