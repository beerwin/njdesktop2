import { v4 as uuidV4 } from 'uuid';
import HasEvents from "./hasEvents";
import NjWindowHeaderButton from './njWindowHeaderButton';
import { NJ_MAXIMIZE, NJ_MINIMIZE } from './njWindowHeaderButtonTypes';
import { NJ_MINIMIZE as _NJ_MINIMIZE, NJ_MAXIMIZE as _NJ_MAXIMIZE, NJ_CLOSE, NJ_RESTORE } from './njWindowHeaderButtonTypes';
import { WS_MAXIMIZED, WS_NORMAL } from './njWindowStates';

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
            _NJ_MINIMIZE, 
            _NJ_MAXIMIZE, 
            NJ_CLOSE
        ];

        this.buttons = this.createButtons();
    }

    createButtons() {
        const buttons = [];
        if (this.availableButtons.indexOf(_NJ_MINIMIZE) >= 0) {
            const minimizeButton = new NjWindowHeaderButton(this.element, _NJ_MINIMIZE);
            minimizeButton.on('click', this.minimize.bind(this));
            buttons.push(minimizeButton);
        }
        if (this.availableButtons.indexOf(_NJ_MAXIMIZE) >= 0) {
            const maximizeButton = new NjWindowHeaderButton(this.element, _NJ_MAXIMIZE);
            maximizeButton.on('click', this.maximize.bind(this));
            buttons.push(maximizeButton);
            this.maximizeButton = maximizeButton;
            const restoreButton = new NjWindowHeaderButton(this.element, NJ_RESTORE);
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
        if (this.availableButtons.indexOf(NJ_CLOSE) >= 0) {
            const closeButton = new NjWindowHeaderButton(this.element, NJ_CLOSE);
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

export default NjWindowHeaderButtons;
