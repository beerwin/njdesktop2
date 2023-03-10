import HasEvents from './hasEvents';
import ToolButton from './njToolButton';

const ToolBar = class extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-toolbar');
        if (config && config.classes) {
            this.element.classList.add(...config.classes);
        }
        if (parentElement) {
            parentElement.appendChild(this.element);
        }
        this.toolButtons = [];
    }

    getElement() {
        return this.element;
    }

    addToolButton(config) {
        const toolButton = new ToolButton(this.element, config);
        this.toolButtons.push(toolButton);
        return toolButton;
    }

    addMenu(menu) {
        this.toolButtons.push(menu);
        menu.setParent(this.element);
    }

    getComputedHeight() {
        const style = window.getComputedStyle(this.element);
        const h = style.height.replace('px', '');
        return parseInt(h);
    }

    destroy() {
        super.destroy();
        this.toolButtons.forEach(tb => tb.destroy());
        this.element.parentNode.removeChild(this.element);
    }
}

export default ToolBar;