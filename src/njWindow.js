const {v4: uuidV4} = require('uuid');
const {NjWindowHeader} = require('./njWindowHeader');
const {HasEvents} = require('./hasEvents');
const NjWindowStates = require('./njWindowStates');
const NJWindowHeaderButtonTypes = require('./njWindowHeaderButtonTypes');
const { WS_MINIMIZED } = require('./njWindowStates');
const { default: interact } = require('interactjs');

const defaultHeaderButtons = [
    NJWindowHeaderButtonTypes.NJ_MINIMIZE,
    NJWindowHeaderButtonTypes.NJ_MAXIMIZE,
    NJWindowHeaderButtonTypes.NJ_CLOSE,
]

const NjWindow = class extends HasEvents {
    constructor(parentElement, rect, title, state, availableButtons) {
        super();
        this.rect = rect;
        this.id = uuidV4();
        this.title = title;
        this.element = document.createElement('div');
        this.element.setAttribute('id', this.id);
        this.element.classList.add('nj-window');
        this.element.addEventListener('mousedown', this.focus.bind(this));
        this.setLeft(rect.x);
        this.setTop(rect.y);
        this.setWidth(rect.width);
        this.setHeight(rect.height);
        parentElement.appendChild(this.element);
        this.visible = true;
        this.changeState(state || NjWindowStates.WS_NORMAL);
        this.header = this.createHeader(availableButtons || defaultHeaderButtons);
        this.header.on('stateChange', this.headerStateChange.bind(this));
        this.header.on('close', this.closeQuery.bind(this));
        this.initInteract();
    }

    setTitle(title) {
        this.title = title;
        this.header.setTitle(this.title);
        this.triggerListeners('titleUpdated', this.title);
    }

    getTitle() {
        return this.title;
    }

    setWidth(width) {
        this.rect.width = width;
        this.element.style.width = width + 'px';
    }

    width() {
        return this.rect.width;
    }

    setHeight(height) {
        this.rect.height = height;
        this.element.style.height = height + 'px';
    }

    height() {
        return this.rect.height;
    }

    setLeft(left) {
        this.rect.x = left;
        this.element.style.transform = `translate(${this.rect.x}px, ${this.rect.y}px)`
    }

    setTop(top) {
        this.rect.y = top;
        this.element.style.transform = `translate(${this.rect.x}px, ${this.rect.y}px)`
    }

    createHeader(availableButtons){
        return new NjWindowHeader(this.element, this.title, availableButtons, this.state);
    }

    minimize() {
        this.changeState(NjWindowStates.WS_MINIMIZED);
        super.triggerListeners('stateChange', this.state);
    }

    isMinimized() {
        return this.state === WS_MINIMIZED;
    }

    maximize() {
        this.changeState(NjWindowStates.WS_MAXIMIZED);
        super.triggerListeners('stateChange', this.state);
    }

    hide() {
        this.visible = false;
        this.element.classList.add('nj-hidden');
        super.triggerListeners('hide');
    }

    show() {
        this.visible = true;
        this.element.classList.remove('nj-hidden');
        super.triggerListeners('show');
    }

    setZIndex(index) {
        this.element.style.zIndex = index;
    }

    restore() {
        this.state = this.previousState;
        if (!this.visible) {
            this.show();
        }
        this.updateClasses();
        super.triggerListeners('stateChange', this.state);
    }

    headerStateChange(origin, state) {
        this.changeState(state);
        this.header.updateState(state);
        super.triggerListeners('stateChange', this.state);
    }

    changeState(state) {
        this.previousState = this.state;
        this.state = state;
        this.updateClasses();
        if (this.state === WS_MINIMIZED) {
            setTimeout(() => {
                this.blur();
                this.hide();
            }, 200);    
        }
    }

    async closeQuery() {
        const responses = await super.triggerListeners('beforeClose');
        if (responses.length === 0 || responses[responses.length - 1] === true) {
            this.close();
        }
    }

    async close() {
        await this.triggerListeners('close');
        this.destroy();
    }

    updateClasses() {
        switch (this.state) {
            case NjWindowStates.WS_MAXIMIZED: 
                this.element.classList.remove('nj-minimized');
                this.element.classList.add('nj-maximized');
                break;
            case NjWindowStates.WS_MINIMIZED: 
                this.element.classList.remove('nj-maximized');
                this.element.classList.add('nj-minimized');
                break;
            case NjWindowStates.WS_NORMAL: 
                this.element.classList.remove('nj-maximized');
                this.element.classList.remove('nj-minimized');
                break;
        }
    }

    focus() {
        this.element.classList.add('focused');
        this.triggerListeners('focus');
    }

    blur() {
        this.element.classList.remove('focused');
        this.triggerListeners('blur');
    }

    initInteract() {
        interact(this.element).draggable({
            allowFrom: '.nj-window-header',
            ignoreFrom: '.nj-window-header .nj-window-header-buttons',
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                })
            ],
            listeners: {
                start: () => {
                    this.element.classList.add('moving');
                },
                move: (e) => {
                    this.setLeft(this.rect.x + e.dx);
                    this.setTop(this.rect.y + e.dy);
                },
                end: () => {
                    this.element.classList.remove('moving');
                }
            }
        }).resizable({
            edges: { bottom: true, right: true },
            listeners: {
                start: () => {
                    this.element.classList.add('resizing');
                },
                move: (event) => {
                    if (event.rect.width >= 150) {
                        this.setWidth(event.rect.width);
                    }
                    if (event.rect.height >= 50) {
                        this.setHeight(event.rect.height);
                    }
                },
                end: () => {
                    this.element.classList.remove('resizing');
                },
            }
        })
    }

    destroy() {
        super.destroy();
        this.header.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}


module.exports = {
    NjWindow,
}