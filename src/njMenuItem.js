const { HasEvents } = require("./hasEvents");
const { NjMenu } = require("./njMenu");

const NjMenuItem = class extends HasEvents {
    constructor(config) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-menu-item');
        this.title = '';
        this.buttonElement = document.createElement('button');
        this.iconElement = document.createElement('div');
        this.iconElement.classList.add('.nj-menu-icon');
        this.buttonElement.appendChild(this.iconElement);
        this.setTitle(config.title ?? '');
        if (config.icon) {
            this.setIcon(config.icon);
        }
        this.buttonElement.addEventListener('click', e => {
            this.triggerListeners('click', {nativeEvent: e})
        });
        this.buttonElement.addEventListener('mouseenter', () => {
            setTimeout(() => {
                const r = this.element.getBoundingClientRect();
                const top = r.top;
                const height = this.childMenu.getComputedHeight();
                const h = document.querySelector('html').clientHeight;
                console.log(top, top + height + 60, h)

                if (top + height + 60 > h) {
                    this.element.classList.add('low');
                } else {
                    this.element.classList.remove('low');
                }    
            }, 10);
        })
        this.element.appendChild(this.buttonElement);
        this.childMenu = new NjMenu(this.element);
        this.childMenu.setParent(this.element);
    }

    setTitle(title) {
        this.title = title;
        this.buttonElement.innerText = title;
        this.buttonElement.setAttribute('title', title);
    }

    setIcon(icon) {
        this.iconElement.style.backgroundImage = icon;
    }

    addItem(menuItem) {
        this.childMenu.addItem(menuItem);
        this.updateClasses();
    }

    removeItem(menuItem) {
        this.childMenu.removeItem(menuItem);
        this.updateClasses();
    }

    updateClasses() {
        if (this.childMenu.has()) {
            this.element.classList.add('has-children');
        } else {
            this.element.classList.remove('has-children');
        }
    }

    getElement() {
        return this.element;
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        this.items.forEach(i => i.destroy());
        this.element.parentElement.removeChild(this.element);
    }
}

module.exports = {
    NjMenuItem,
}