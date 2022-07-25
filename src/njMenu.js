const { HasEvents } = require("./hasEvents");

const NjMenu = class extends HasEvents {
    constructor() {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-menu')
        this.items = [];
    }

    addItem(menuItem) {
        this.items.push(menuItem);
        menuItem.setParent(this.element);
    }

    removeItem(menuItem) {
        this.items = this.items.filter(i => i!== menuItem);
        menuItem.destroy();
    }

    has() {
        return this.items.length > 0;
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        this.items.forEach(i => i.destroy());
        this.element.parentNode.removeChild(this.element);
    }

    getComputedHeight() {
        const style = window.getComputedStyle(this.element);
        const h = style.height.replace('px', '');
        return parseInt(h);
    }

    getTop() {
        return this.element.scrollTop;
    }
}

module.exports = {
    NjMenu,
}