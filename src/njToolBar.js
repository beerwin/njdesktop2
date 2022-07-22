const { HasEvents } = require('./hasEvents');
const { ToolButton } = require('./njToolButton');

const ToolBar = class extends HasEvents {
    constructor(parentElement) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-toolbar');
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

    destroy() {
        super.destroy();
        this.toolButtons.forEach(tb => tb.destroy());
        this.element.parentNode.removeChild(this.element);
    }
}

module.exports = {
    ToolBar,
}