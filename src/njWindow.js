import { v4 as uuidV4 } from 'uuid';
import NjWindowHeader from './njWindowHeader';
import HasEvents from './hasEvents';
import { WS_NORMAL as _WS_NORMAL, WS_MINIMIZED as _WS_MINIMIZED, WS_MAXIMIZED as _WS_MAXIMIZED } from './njWindowStates';
import { NJ_MINIMIZE, NJ_MAXIMIZE, NJ_CLOSE } from './njWindowHeaderButtonTypes';
import { WS_MINIMIZED, WS_MAXIMIZED, WS_NORMAL } from './njWindowStates';
import { default as interact } from 'interactjs';

const defaultHeaderButtons = [
    NJ_MINIMIZE,
    NJ_MAXIMIZE,
    NJ_CLOSE,
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
        this.menuContainer = document.createElement('div');
        this.menuContainer.classList.add('nj-menu-container');
        this.toolbarContainer = document.createElement('div');
        this.toolbarContainer.classList.add('nj-toolbar-container');
        this.setLeft(rect.x);
        this.setTop(rect.y);
        this.setWidth(rect.width);
        this.setHeight(rect.height);
        parentElement.appendChild(this.element);
        this.visible = true;
        this.changeState(state || _WS_NORMAL);
        this.header = this.createHeader(availableButtons || defaultHeaderButtons);
        this.header.on('stateChange', this.headerStateChange.bind(this));
        this.header.on('close', this.closeQuery.bind(this));
        this.element.appendChild(this.menuContainer);
        this.element.appendChild(this.toolbarContainer);
        this.contentContainer = document.createElement('div');
        this.contentContainer.classList.add('nj-window-content');
        this.element.appendChild(this.contentContainer);
        this.toolbars = [];
        this.footerContainer = document.createElement('div');
        this.footerContainer.classList.add('nj-footer-container');
        this.footer = null;
        this.element.appendChild(this.footerContainer);
        this.initInteract();
        this.on('stateChange', (source, state) => {
            let listeners = '';
            switch (state) {
                case WS_MINIMIZED: 
                    this.triggerListeners('minimize');
                    break;
                case WS_MAXIMIZED: 
                    this.triggerListeners('maximize');
                    break;
                case WS_NORMAL: 
                    this.triggerListeners('restore');
                    break;
            }

            if (listeners.length > 0) {
                this.triggerListeners(listeners);
            }
        });
    }

    setMenu(menu) {
        this.menu = menu;
        this.menu.setParent(this.menuContainer);
    }

    addClass(className) {
        this.element.classList.add(className);
    }

    removeClass(className) {
        this.element.classList.remove(className);
    }

    addToolbar(toolbar) {
        this.toolbars.push(toolbar);
        this.toolbarContainer.appendChild(toolbar.getElement());
    }

    removeToolbar(toolbar) {
        toolbar.destroy();
        this.toolbars = this.toolbars.filter(t => t !== toolbar);
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
        this.headerStateChange(null,_WS_MINIMIZED);
        super.triggerListeners('stateChange', this.state);
    }

    isMinimized() {
        return this.state === WS_MINIMIZED;
    }

    maximize() {
        this.changeState(_WS_MAXIMIZED);
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

    zIndex() {
        return this.element.style.zIndex;
    }

    restore() {
        this.state = this.previousState;
        if (!this.visible) {
            this.show();
        }
        this.header.updateState(this.state);
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

    getState() {
        return this.state;
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
            case _WS_MAXIMIZED: 
                this.element.classList.remove('nj-minimized');
                this.element.classList.add('nj-maximized');
                break;
            case _WS_MINIMIZED: 
                this.element.classList.remove('nj-maximized');
                this.element.classList.add('nj-minimized');
                break;
            case _WS_NORMAL: 
                this.element.classList.remove('nj-maximized');
                this.element.classList.remove('nj-minimized');
                break;
        }
    }

    focus() {
        if (!this.element.classList.contains('focused')) {
            this.element.classList.add('focused');
            this.triggerListeners('focus');
        }
    }

    blur() {
        this.element.classList.remove('focused');
        this.triggerListeners('blur');
    }

    initInteract() {
        let oldResizeRect = {...this.rect};
        let oldMoveRect = {...this.rect};
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
                    oldResizeRect = {...this.rect};
                    this.element.classList.add('moving');
                },
                move: (e) => {
                    const oldRect = {...this.rect};
                    this.setLeft(this.rect.x + e.dx);
                    this.setTop(this.rect.y + e.dy);
                    this.triggerListeners('move', {oldRect, rect: this.rect});
                },
                end: () => {
                    this.element.classList.remove('moving');
                    this.triggerListeners('moved', {oldRect: oldMoveRect, rect: this.rect});
                }
            }
        }).resizable({
            edges: { bottom: true, right: true },
            listeners: {
                start: () => {
                    oldMoveRect = {...this.rect};
                    this.element.classList.add('resizing');
                },
                move: (event) => {
                    const oldRect = {...this.rect};
                    if (event.rect.width >= 150) {
                        this.setWidth(event.rect.width);
                    }
                    let maxHeight = 0;
                    maxHeight += this.header.getComputedHeight();
                    maxHeight += this.menu?.getComputedHeight() ?? 0;
                    this.toolbars.forEach(t => maxHeight += t.getComputedHeight());
                    maxHeight += this.footer?.getComputedHeight() ?? 0;
                    maxHeight += 30;

                    if (maxHeight < 50) {
                        maxHeight = 50;
                    }

                    if (event.rect.height >= maxHeight) {
                        this.setHeight(event.rect.height);
                    }
                    this.triggerListeners('resize', {oldRect, rect: this.rect});
                },
                end: () => {
                    this.element.classList.remove('resizing');
                    this.triggerListeners('resized', {oldRect: oldResizeRect, rect: this.rect});
                },
            }
        })
    }

    setContentElement(element) {
        this.contentContainer.innerHTML = '';
        this.contentContainer.appendChild(element);
    }

    setContentObject(object) {
        this.contentObject = object;
        this.contentObject.setParent(this.contentContainer);
    }

    setFooter(footer) {
        this.footer = footer;
        this.footer.setParent(this.footerContainer);
    }

    getFooter() {
        return this.footer;
    }

    clearFooter() {
        this.footer.destroy();
        this.footer = null;
    }

    destroy() {
        super.destroy();
        this.header.destroy();
        if (this.contentObject) {
            this.contentObject.destroy();
        }
        this.element.parentNode.removeChild(this.element);
    }
}


export default NjWindow;