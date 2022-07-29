const { HasEvents } = require("./hasEvents");

class NjTaskBarButtonList extends HasEvents {
    constructor(parentNode){
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-taskbar-button-list');
        this.leftButtonElement = document.createElement('button');
        this.leftButtonElement.classList.add('nj-taskbar-button-list-nav');
        this.leftButtonElement.classList.add('nj-taskbar-button-list-nav-left');
        this.rightButtonElement = document.createElement('button');
        this.rightButtonElement.classList.add('nj-taskbar-button-list-nav');
        this.rightButtonElement.classList.add('nj-taskbar-button-list-nav-right');
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.classList.add('nj-taskbar-button-list-container');
        this.element.appendChild(this.leftButtonElement);
        this.element.appendChild(this.buttonContainer);
        this.element.appendChild(this.rightButtonElement);
        parentNode.appendChild(this.element);
        this.buttons = [];
    }

    addWindowButton(njWindow) {
        const button = document.createElement('button');
        button.innerText = njWindow.getTitle();
        button.addEventListener('click', () => {
            const buttonItem = this.buttons.find(b => b.njWindow === njWindow);

            if (buttonItem.njWindow.isMinimized()) {
                buttonItem.njWindow.restore();
            }

            if (!buttonItem.focused) {
                njWindow.focus();
                return;
            }

            if (buttonItem.focused) {
                buttonItem.njWindow.minimize();
                return;
            }
        })
        const buttonItem = {
            button,
            njWindow,
            focused: false,
        }
        this.buttons.push(buttonItem);
        this.buttonContainer.appendChild(button);
        njWindow.on('titleUpdated', this.windowUpdated.bind(this));
        njWindow.on('stateChange', this.windowStateUpdated.bind(this));
        njWindow.on('close', this.windowRemoved.bind(this));
        njWindow.on('focus', this.windowFocused.bind(this));
        njWindow.on('blur', this.windowBlurred.bind(this));
        this.leftButtonElement.addEventListener('click', () => {
            this.buttonContainer.scrollBy({top: 0, left: -100, behavior: 'smooth'});
        })
        this.rightButtonElement.addEventListener('click', () => {
            this.buttonContainer.scrollBy({top: 0, left: 100, behavior: 'smooth'});
        })
    }

    windowRemoved(njWindow) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.button.parentNode.removeChild(button.button);
        this.buttons = this.buttons.filter(b => b.njWindow !== njWindow);        
    }

    windowFocused(njWindow) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.focused = true;
        button.button.classList.add('focused');
        button.button.scrollIntoView();
    }

    windowBlurred(njWindow) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.focused = false;
        button.button.classList.remove('focused');
    }

    windowStateUpdated(njWindow) {
        //
    }

    windowUpdated(njWindow, payload) {
        const button = this.buttons.find(b => b.njWindow === njWindow);
        button.button.innerText = payload;
        button.button.setAttribute('title', payload)
    }

    destroy() {
        super.destroy();
        this.buttons = [];
        this.element.parentNode.removeChild(this.element);
    }
}

module.exports = {
    NjTaskBarButtonList,
}