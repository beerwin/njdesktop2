import HasEvents from "./hasEvents";
import NjMenu from "./njMenu";

const NjMenuItem = class extends HasEvents {
    constructor(config) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-menu-item');
        this.title = '';
        this.buttonElement = document.createElement('button');
        this.iconElement = document.createElement('div');
        this.iconElement.classList.add('nj-menu-icon');
        this.buttonTextElement = document.createElement('div');
        this.buttonTextElement.classList.add('nj-menu-text');        
        this.buttonElement.appendChild(this.iconElement);
        this.buttonElement.appendChild(this.buttonTextElement);
        this.buttonElement.classList.add('text');
        if (config.iconOnly) {
            this.buttonElement.classList.add('icon-only');
        }
        this.setTitle(config.title ?? '');
        if (config.icon) {
            this.setIcon(config.icon);
        }
        if (config.click) {
            this.on('click', config.click);
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
        this.buttonTextElement.innerText = title;
        this.buttonElement.setAttribute('title', title);
    }

    setIcon(icon) {
        this.iconElement.style.backgroundImage = icon;
        if (!icon) {
            this.buttonElement.classList.add('text');
        } else {
            this.buttonElement.classList.remove('text');
        }
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

export default NjMenuItem;