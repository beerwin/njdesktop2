const { v4: uuidV4 } = require('uuid');
const { HasEvents } = require("./hasEvents");
const { NjWindowHeaderButton } = require('./njWindowHeaderButton');
const { NJ_MAXIMIZE, NJ_MINIMIZE } = require('./njWindowHeaderButtonTypes');
const NJWindowHeaderButtonTypes = require('./njWindowHeaderButtonTypes');
const { WS_MAXIMIZED, WS_NORMAL } = require('./njWindowStates');

class NjWindowHeaderButtons extends HasEvents {
    constructor(parentNode, availableButtons, state) {
        super();
        this.id = uuidV4();
        this.state = state;
        this.element = document.createElement('div');
        this.element.setAttribute('id', this.id);
        this.element.classList.add('nj-window-header-buttons');
        parentNode.appendChild(this.element);
        this.availableButtons = availableButtons || [
            NJWindowHeaderButtonTypes.NJ_MINIMIZE, 
            NJWindowHeaderButtonTypes.NJ_MAXIMIZE, 
            NJWindowHeaderButtonTypes.NJ_CLOSE
        ];

        this.buttons = this.createButtons();
    }

    createButtons() {
        const buttons = [];
        if (this.availableButtons.indexOf(NJWindowHeaderButtonTypes.NJ_MINIMIZE) >= 0) {
            const minimizeButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_MINIMIZE);
            minimizeButton.on('click', this.minimize.bind(this));
            buttons.push(minimizeButton);
        }
        if (this.availableButtons.indexOf(NJWindowHeaderButtonTypes.NJ_MAXIMIZE) >= 0) {
            const maximizeButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_MAXIMIZE);
            maximizeButton.on('click', this.maximize.bind(this));
            buttons.push(maximizeButton);
            this.maximizeButton = maximizeButton;
            const restoreButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_RESTORE);
            restoreButton.on('click', this.restore.bind(this));
            buttons.push(restoreButton);
            this.restoreButton = restoreButton;
            if (this.state === WS_MAXIMIZED) {
                this.maximizeButton.hide();
            }
            if (this.state === WS_NORMAL) {
                this.restoreButton.hide();
            }
        }
        if (this.availableButtons.indexOf(NJWindowHeaderButtonTypes.NJ_CLOSE) >= 0) {
            const closeButton = new NjWindowHeaderButton(this.element, NJWindowHeaderButtonTypes.NJ_CLOSE);
            closeButton.on('click', this.close.bind(this));
            buttons.push(closeButton);
        }

        return buttons;
    }

    minimize() {
        if (this.availableButtons.indexOf(NJ_MINIMIZE) < 0) {
            return;
        }
        super.triggerListeners('minimize');
    }

    maximize() {
        if (this.availableButtons.indexOf(NJ_MAXIMIZE) < 0) {
            return;
        }
        this.maximizeButton.hide();
        this.restoreButton.show();
        super.triggerListeners('maximize');
    }

    restore() {
        this.maximizeButton.show();
        this.restoreButton.hide();
        super.triggerListeners('restore');
    }

    close() {
        super.triggerListeners('close');
    }

    updateState(state) {
        this.state = state;
        switch (this.state) {
            case WS_MAXIMIZED:
                this.maximizeButton.hide();
                this.restoreButton.show();
                break;
            case WS_NORMAL:
                this.maximizeButton.show();
                this.restoreButton.hide();
                break;
        }
    }

    destroy() {
        super.destroy();
        for (let x in this.buttons) {
            this.buttons[x].destroy();
        }
        this.buttons = [];
        this.element.parentNode.removeChild(this.element);
        this.availableButtons = null;
        this.id = null;
    }
}

module.exports = {
    NjWindowHeaderButtons,
}
