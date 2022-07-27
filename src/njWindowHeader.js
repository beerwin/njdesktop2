const {v4: uuidV4} = require('uuid');
const { HasEvents } = require('./hasEvents');
const { NjWindowHeaderButtons } = require('./njWindowHeaderButtons');
const { NJ_MAXIMIZE } = require('./njWindowHeaderButtonTypes');
const { WS_MINIMIZED, WS_MAXIMIZED, WS_NORMAL } = require('./njWindowStates');

const NjWindowHeader = class extends HasEvents {
    constructor(parentElement, title, availableHeaderButtons, state) {
        super();
        this.title = title;
        this.id = uuidV4();
        this.element = document.createElement('div');
        this.element.classList.add('nj-window-header');
        this.element.setAttribute('id', this.id);
        this.titleText = document.createElement('div');
        this.titleText.classList.add('nj-window-header-title');
        this.titleText.addEventListener('dblclick', () => {
            if (availableHeaderButtons.indexOf(NJ_MAXIMIZE) < 0) {
                return;
            }
            if (this.state === WS_NORMAL) {
                this.updateState(WS_MAXIMIZED);
                this.maximize();
                return;
            }

            if (this.state === WS_MAXIMIZED) {
                this.restore();
            }
        })
        this.titleText.innerText = this.title;
        this.state = state;
        this.element.appendChild(this.titleText);
        this.parentElement = parentElement;
        this.parentElement.appendChild(this.element);
        this.headerButtons = this.createHeaderButtons(availableHeaderButtons);
        this.headerButtons.on('minimize', this.minimize.bind(this));
        this.headerButtons.on('maximize', this.maximize.bind(this));
        this.headerButtons.on('restore', this.restore.bind(this));
        this.headerButtons.on('close', this.close.bind(this));
    }

    setTitle(title) {
        this.title = title;
        this.titleText.innerText = this.title;
    }

    createHeaderButtons(availableHeaderButtons) {
        return new NjWindowHeaderButtons(this.element, availableHeaderButtons, this.state);
    }

    minimize() {
        super.triggerListeners('stateChange', WS_MINIMIZED);
    }

    maximize() {
        super.triggerListeners('stateChange', WS_MAXIMIZED);
    }

    restore() {
        super.triggerListeners('stateChange', WS_NORMAL);
    }

    close() {
        super.triggerListeners('close');
    }

    updateState(state) {
        this.state = state;
        this.headerButtons.updateState(state);
    }

    destroy() {
        super.destroy();
        this.headerButtons.destroy();
        this.element.parentNode.removeChild(this.element);
        this.titleText = null;
    }

    getComputedHeight() {
        const style = window.getComputedStyle(this.element);
        const h = style.height.replace('px', '');
        return parseInt(h);
    }
}

module.exports = {
    NjWindowHeader
}